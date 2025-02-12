import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';

@Injectable()
export class TopcasesRepository extends Repository<TimeSeries> {
  constructor(private dataSource: DataSource) {
    super(TimeSeries, dataSource.createEntityManager());
  }

 public async findByCountryAndDateRange(
    country: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<TimeSeries[]> {
    const query = this.createQueryBuilder('timeseries')
      .where('timeseries.country = :country', { country });

    if (fromDate) {
      query.andWhere('timeseries.date >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('timeseries.date <= :toDate', { toDate });
    }

    return await query.getMany();
  }
}
