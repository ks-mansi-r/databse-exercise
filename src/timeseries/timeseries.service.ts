import { Injectable, BadRequestException, NotFoundException, ConflictException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSeries } from './entity/timeseries.entity';
import { AddTimeSeriesDto } from './dto/add-timeseries.dto';
import { UpdateTimeSeriesDto } from './dto/update-timeseries.dto';
import { Country } from 'src/country/entity/country.entity';
import { DataSource } from 'typeorm';
@Injectable()
export class TimeSeriesService {
  constructor(
    @InjectRepository(TimeSeries)
    private readonly timeSeriesRepository: Repository<TimeSeries>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    //Inject datasource 
    private readonly datasource: DataSource,
  ) { }

  async addTimeSeries(data: AddTimeSeriesDto) {

    // create a query runne5r
    const queryRunner = this.datasource.createQueryRunner();

    //connect a query runner
    await queryRunner.connect();

    // Start transcation
    await queryRunner.startTransaction();
    try {

    }
    catch (error) {
      throw new RequestTimeoutException(
        'Not connect to database please check it ',
      );

    }

    try {
      const country = await this.countryRepository.findOne({ where: { id: data.countryId } });
      if (!country) {
        throw new BadRequestException('Country not found.');
      }

      const timeSeries = this.timeSeriesRepository.create({ ...data, country });
      return this.timeSeriesRepository.save(timeSeries);
    } catch (error) {

      //If unsuccessfull then rollback transcation
      await queryRunner.rollbackTransaction();

      throw new ConflictException(
        'Not complete the transaction',)
    }
    finally {

      try {
        // Release transcation
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Not release the connection',
          {
            description: String(error),
          });
      }

    }
  }

  async updateTimeSeries(id: number, data: UpdateTimeSeriesDto) {

    try {
      const timeSeries = await this.timeSeriesRepository.findOne({ where: { id } });
      if (!timeSeries) {
        throw new BadRequestException('Time series entry not found.');
      }

      Object.assign(timeSeries, data);
      return this.timeSeriesRepository.save(timeSeries);
    } catch (error) {
      throw new NotFoundException(
        'Data is not available for this date and country.',
      )
    }
  }

  async deleteTimeSeries(id: number) {

    try {
      const timeSeries = await this.timeSeriesRepository.findOne({ where: { id } });
      if (!timeSeries) {
        throw new BadRequestException('Time series entry not found.');
      }

      return this.timeSeriesRepository.remove(timeSeries);
    } catch (error) {

      throw new NotFoundException(
        'Data is not available for this date and country'
      )
    }
  }

  async getTimeSeriesByCountry(countryId: number) {
    try {
      return this.timeSeriesRepository.find({ where: { country: { id: countryId } } });
    }
    catch (error) {
      throw new NotFoundException('Data is not available');
    }
  }
}
