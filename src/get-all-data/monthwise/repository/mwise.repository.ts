import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';
import { parse, format } from 'date-fns';

export interface CountryCase {
  country: string;
  month: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

@Injectable()
export class MonthRepository extends Repository<TimeSeries> {
  constructor(private dataSource: DataSource) {
    super(TimeSeries, dataSource.createEntityManager());
  }

  // Custom method to get country cases with filters
  public async getCountryCase(
    fromDate?: string,
    toDate?: string,
    confirmedGte?: number,
    confirmedLte?: number,
  ): Promise<CountryCase[]> {
    const result: CountryCase[] = [];

    // Use 'this' to access inherited Repository methods
    const timeseriesData = await this.find();

    const monthlyDataByCountry: {
      [country: string]: {
        [month: string]: {
          confirmed: number;
          deaths: number;
          recovered: number;
        };
      };
    } = {};

    // Date parsing logic
    const from = fromDate ? parse(fromDate, 'yyyy-MM-dd', new Date()) : new Date(0);
    const to = toDate ? parse(toDate, 'yyyy-MM-dd', new Date()) : new Date();

    // Group timeseries data by country and month
    timeseriesData.forEach((input) => {
      const date = parse(input.date, 'yyyy-MM-dd', new Date());
      const month = format(date, 'yyyy-MM');

      // Skip entries outside the specified date range
      if (date < from || date > to) return;

      if (!monthlyDataByCountry[input.id]) {
        monthlyDataByCountry[input.id] = {};
      }

      if (!monthlyDataByCountry[input.id][month]) {
        monthlyDataByCountry[input.id][month] = {
          confirmed: 0,
          deaths: 0,
          recovered: 0,
        };
      }

      // Accumulate the data
      monthlyDataByCountry[input.id][month].confirmed += input.confirmed;
      monthlyDataByCountry[input.id][month].deaths += input.deaths;
      monthlyDataByCountry[input.id][month].recovered += input.recovered;
    });

    // Filter and compile the results based on confirmed case count range
    Object.entries(monthlyDataByCountry).forEach(([country, months]) => {
      Object.entries(months).forEach(([month, { confirmed, deaths, recovered }]) => {
        const isWithinRange =
        
          (confirmedGte === undefined || confirmed >= confirmedGte) &&
          (confirmedLte === undefined || confirmed <= confirmedLte);

        if (isWithinRange) {
          result.push({
            country,
            month,
            confirmed,
            deaths,
            recovered,
          });
        }
      });
    });

    return result;
  }
}
