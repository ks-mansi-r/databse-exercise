import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSeries } from './entity/timeseries.entity';
// import { Country } from 'src/country/entity/country.entity';
import { TimeSeriesService } from './timeseries.service';
import { TimeSeriesController } from './timeseries.controller';
import { Country } from 'src/country/entity/country.entity';

import { CountryModule } from 'src/country/country.module';
import { TimeSeriesRepository } from './repository/time-series.repository';
@Module({
  imports: [TypeOrmModule.forFeature([TimeSeries, Country]), CountryModule],
  controllers: [TimeSeriesController],
  providers: [TimeSeriesService, TimeSeriesRepository],
})
export class TimeseriesModule {}