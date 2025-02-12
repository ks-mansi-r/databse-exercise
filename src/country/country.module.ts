import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { Country } from "./entity/country.entity";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TimeSeries, Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}