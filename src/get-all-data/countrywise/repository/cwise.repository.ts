import { Repository, DataSource } from 'typeorm';
import { TimeSeries } from '../../../timeseries/entity/timeseries.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CwiseRepository extends Repository<TimeSeries> {
  constructor(private dataSource: DataSource) {
    super(TimeSeries, dataSource.createEntityManager());
  }

  // Custom method to get country cases
  public async getCountryCase(fromDate?: string, toDate?: string, confirmedGte?: number, confirmedLte?: number,
  ): Promise<{ country: string; totals: { confirmed: number; deaths: number; recovered: number } }[]> {

    const query = this.createQueryBuilder('timeseries')
      
    .select('country.name', 'country')
    .addSelect('SUM(timeseries.confirmed)', 'confirmed')
    .addSelect('SUM(timeseries.deaths)', 'deaths')
    .addSelect('SUM(timeseries.recovered)', 'recovered')
    .innerJoin('timeseries.country', 'country')
    .groupBy('country.name');

  if (fromDate) {
    query.andWhere('timeseries.date >= :fromDate', { fromDate });
  }

  if (toDate) {
    query.andWhere('timeseries.date <= :toDate', { toDate });
  }

  if (confirmedGte !== undefined) {
    query.having('SUM(timeseries.confirmed) >= :confirmedGte', { confirmedGte });
  }

  if (confirmedLte !== undefined) {
    query.having('SUM(timeseries.confirmed) <= :confirmedLte', { confirmedLte });
  }

  const resultData = await query.getRawMany();

  return resultData.map(row => ({
    country: row.country,
    totals: {
      confirmed: Number(row.confirmed),
      deaths: Number(row.deaths),
      recovered: Number(row.recovered),
    },
  }));

  }
}
