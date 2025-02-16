import { Module } from "@nestjs/common";
import { TopCasesController } from "./topcases.controller";
import { TopCasesService } from "./service/topcases.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { TopcasesRepository } from "./repository/topcases.repository";
@Module({
    imports:[TypeOrmModule.forFeature([TimeSeries])],
    providers:[TopCasesService, TopcasesRepository],
    controllers:[TopCasesController]
})
export class TopCasesModule
{}