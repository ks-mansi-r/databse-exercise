import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { Country } from "./entity/country.entity";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";

import { CountrysRepository } from './repository/country.repository';
@Module({
  imports: [TypeOrmModule.forFeature([TimeSeries, Country])],
  controllers: [CountryController],
  providers: [CountryService, CountrysRepository],
  // exports:[CountryRepository]
})
export class CountryModule {}