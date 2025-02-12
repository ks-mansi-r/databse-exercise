import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSeries } from './entity/timeseries.entity';
import { AddTimeSeriesDto } from './dto/add-timeseries.dto';
import { UpdateTimeSeriesDto } from './dto/update-timeseries.dto';
import { Country } from 'src/country/entity/country.entity';

@Injectable()
export class TimeSeriesService {
  constructor(
    @InjectRepository(TimeSeries)
    private readonly timeSeriesRepository: Repository<TimeSeries>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async addTimeSeries(data: AddTimeSeriesDto) {
    const country = await this.countryRepository.findOne({ where: { id: data.countryId } });
    if (!country) {
      throw new BadRequestException('Country not found.');
    }

    const timeSeries = this.timeSeriesRepository.create({ ...data, country });
    return this.timeSeriesRepository.save(timeSeries);
  }

  async updateTimeSeries(id: number, data: UpdateTimeSeriesDto) {
    const timeSeries = await this.timeSeriesRepository.findOne({ where: { id } });
    if (!timeSeries) {
      throw new BadRequestException('Time series entry not found.');
    }

    Object.assign(timeSeries, data);
    return this.timeSeriesRepository.save(timeSeries);
  }

  async deleteTimeSeries(id: number) {
    const timeSeries = await this.timeSeriesRepository.findOne({ where: { id } });
    if (!timeSeries) {
      throw new BadRequestException('Time series entry not found.');
    }

    return this.timeSeriesRepository.remove(timeSeries);
  }

  async getTimeSeriesByCountry(countryId: number) {
    return this.timeSeriesRepository.find({ where: { country: { id: countryId } } });
  }
}
