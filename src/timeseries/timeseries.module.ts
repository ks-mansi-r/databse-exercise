import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSeries } from './entity/timeseries.entity';
// import { Country } from 'src/country/entity/country.entity';
import { TimeSeriesService } from './timeseries.service';
import { TimeSeriesController } from './timeseries.controller';
import { Country } from 'src/country/entity/country.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TimeSeries, Country])],
  controllers: [TimeSeriesController],
  providers: [TimeSeriesService],
})
export class TimeseriesModule {}