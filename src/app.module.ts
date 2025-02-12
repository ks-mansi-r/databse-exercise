import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeSeries } from './timeseries/entity/timeseries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country/entity/country.entity';
import { CountryModule } from './country/country.module';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { CountryListModule } from './get-all-data/countrylist/countrylist.module';
import { OverviewCasesModule } from './get-all-data/overview-cases/overviewcases.module';
import { CountryWiseModule } from './get-all-data/countrywise/countrywise.module';
import { MonthWiseModule } from './get-all-data/monthwise/monthwise.module';
import { TopCasesModule } from './get-all-data/top-n-cases/topcases.module';
@Module({
  imports: [CountryModule,
  TimeseriesModule,
  CountryListModule,
  OverviewCasesModule,
  CountryWiseModule,
  MonthWiseModule,
  TopCasesModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'covid_api',
    entities: [Country, TimeSeries],
    synchronize: true,
    autoLoadEntities: true,
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
