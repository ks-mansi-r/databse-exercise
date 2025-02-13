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

  async getCountryCase(
    fromDate?: string,
    toDate?: string,
    confirmedGte?: number,
    confirmedLte?: number,
  ): Promise<CountryCase[]> {
    const query = this.createQueryBuilder('ts')
      .select('ts.country', 'country')
      .addSelect("TO_CHAR(ts.date, 'YYYY-MM')", 'month')
      .addSelect('SUM(ts.confirmed)', 'confirmed')
      .addSelect('SUM(ts.deaths)', 'deaths')
      .addSelect('SUM(ts.recovered)', 'recovered')
      .groupBy('ts.country')
      .addGroupBy("TO_CHAR(ts.date, 'YYYY-MM')");

    if (fromDate) {
      query.andWhere('ts.date >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('ts.date <= :toDate', { toDate });
    }

    if (confirmedGte !== undefined) {
      query.having('SUM(ts.confirmed) >= :confirmedGte', { confirmedGte });
    }

    if (confirmedLte !== undefined) {
      query.having('SUM(ts.confirmed) <= :confirmedLte', { confirmedLte });
    }

    const results = await query.getRawMany();

    return results.map((result) => ({
      country: result.country,
      month: result.month,
      confirmed: parseInt(result.confirmed, 10),
      deaths: parseInt(result.deaths, 10),
      recovered: parseInt(result.recovered, 10),
    }));
  }
}
