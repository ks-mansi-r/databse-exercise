import { Repository, DataSource } from 'typeorm';
import { TimeSeries } from '../../../timeseries/entity/timeseries.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CwiseRepository extends Repository<TimeSeries> {
  constructor(private dataSource: DataSource) {
    super(TimeSeries, dataSource.createEntityManager());
  }

  // Custom method to get country cases
  public async getCountryCase(fromDate?: string,toDate?: string,confirmedGte?: number,confirmedLte?: number,
  ): Promise<{ country: string; totals: { confirmed: number; deaths: number; recovered: number } }[]> {
    
    const query = this.createQueryBuilder('timeseries')
      .leftJoinAndSelect('timeseries.country', 'country');

    if (fromDate) {
      query.andWhere('timeseries.date >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('timeseries.date <= :toDate', { toDate });
    }

    const timeSeriesData = await query.getMany();

    //group the retrieved data by country
    const groupedByCountry = timeSeriesData.reduce((acc, entry) => {
      if (!acc[entry.country.name]) {
        acc[entry.country.name] = [];
      }
      acc[entry.country.name].push(entry);
      return acc;
    }, {} as { [key: string]: TimeSeries[] });


    // Initialize the response array to hold the results
    const response: { country: string; totals: { confirmed: number; deaths: number; recovered: number } }[] = [];

    //total cases sum
    for (const [country, data] of Object.entries(groupedByCountry)) {
      const totals = data.reduce(
        (acc, curr) => {
          acc.confirmed += curr.confirmed;
          acc.deaths += curr.deaths;
          acc.recovered += curr.recovered;
          return acc;
        },
        { confirmed: 0, deaths: 0, recovered: 0 },
      );


      // Apply confirmed cases filters
      if (
        (confirmedGte !== undefined && totals.confirmed < confirmedGte) ||
        (confirmedLte !== undefined && totals.confirmed > confirmedLte)
      ) {
        continue;
      }

      // Add the country's totals to the response
      response.push({
        country,
        totals,
      });
    }

    return response;
  }
}
