import { Module } from "@nestjs/common";
import { CountryWiseController } from "./countrywise.controller";
import { CwisecasesService } from "./service/countrywise.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { CwiseRepository } from "./repository/cwise.repository";


@Module({
    controllers:[CountryWiseController],
    providers:[CwisecasesService, CwiseRepository],
    imports:[TypeOrmModule.forFeature([TimeSeries])]
})

export class CountryWiseModule{}