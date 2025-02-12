import { Module } from "@nestjs/common";
import { OverviewController } from "./overviewcases.controller";
import { OverviewService } from "./service/overviewcases.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "src/country/entity/country.entity";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { CcasesRepository } from "./repository/cases.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Country, TimeSeries])],
    providers:[OverviewService, CcasesRepository],
    controllers:[OverviewController]
})
export class OverviewCasesModule{

}