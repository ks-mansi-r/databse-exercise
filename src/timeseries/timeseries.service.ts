import { Injectable, BadRequestException, NotFoundException, ConflictException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSeries } from './entity/timeseries.entity';
import { AddTimeSeriesDto } from './dto/add-timeseries.dto';
import { UpdateTimeSeriesDto } from './dto/update-timeseries.dto';
import { Country } from 'src/country/entity/country.entity';
import { DataSource } from 'typeorm';

import { TimeSeriesRepository } from './repository/time-series.repository';
@Injectable()
export class TimeSeriesService {
  
  constructor(
    private readonly timeSeriesRepository: TimeSeriesRepository,
    @InjectRepository(Country) private readonly countryRepository,
    private readonly datasource: DataSource,
   
  ) {}

  async addTimeSeries(data: AddTimeSeriesDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const country = await this.countryRepository.findOne({ where: { id: data.countryId } });
      if (!country) throw new BadRequestException('Country not found.');

      const result = await this.timeSeriesRepository.addTimeSeries(data, country);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Transaction failed.');
    } finally {
      await queryRunner.release();
    }
  }

  async updateTimeSeries(id: number, data: UpdateTimeSeriesDto) {
    const updatedEntry = await this.timeSeriesRepository.updateTimeSeries(id, data);
    if (!updatedEntry) throw new NotFoundException('Time series entry not found.');
    return updatedEntry;
  }

  async deleteTimeSeries(id: number) {
    const deletedEntry = await this.timeSeriesRepository.deleteTimeSeries(id);
    if (!deletedEntry) throw new NotFoundException('Data not found.');
    return deletedEntry;
  }

  async getTimeSeriesByCountry(countryId: number) {
    return await this.timeSeriesRepository.getTimeSeriesByCountry(countryId);
  }

 
}