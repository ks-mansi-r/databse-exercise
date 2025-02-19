import { Repository, EntityRepository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeSeries } from '../entity/timeseries.entity';
import { AddTimeSeriesDto } from '../dto/add-timeseries.dto';
import { UpdateTimeSeriesDto } from '../dto/update-timeseries.dto';
import { Country } from 'src/country/entity/country.entity';

@Injectable()
export class TimeSeriesRepository extends Repository<TimeSeries> {
  constructor(private readonly dataSource: DataSource) {
    super(TimeSeries, dataSource.createEntityManager());
  }

  async addTimeSeries(data: AddTimeSeriesDto, country: Country) {
    const timeSeries = this.create({ ...data, country });
    return await this.save(timeSeries);
  }

  async updateTimeSeries(id: number, data: UpdateTimeSeriesDto) {
    const timeSeries = await this.findOne({ where: { id } });
    if (!timeSeries) return null;

    Object.assign(timeSeries, data);
    return await this.save(timeSeries);
  }

  async deleteTimeSeries(id: number) {
    const timeSeries = await this.findOne({ where: { id } });
    if (!timeSeries) return null;

    return await this.remove(timeSeries);
  }

  async getTimeSeriesByCountry(countryId: number) {
    return await this.find({ where: { country: { id: countryId } } });
  }
}
