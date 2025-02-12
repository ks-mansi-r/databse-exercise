import { Module } from "@nestjs/common";
import { ExcelService } from "./services/excel.service";
import { ExcelController } from "./excel.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { Country } from "src/country/entity/country.entity";

@Module(
    {
        imports:[TypeOrmModule.forFeature([Country,TimeSeries])],
        providers:[ExcelService],
        controllers:[ExcelController]
    }
)

export class ExcelModule{}