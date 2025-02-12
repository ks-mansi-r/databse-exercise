import { Module } from "@nestjs/common";
import { MonthWiseController } from "./mothwise.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { MonthWiseService } from "./service/monthwise.service";
import { MonthRepository } from "./repository/mwise.repository";

@Module({
    imports:[TypeOrmModule.forFeature([TimeSeries])],
    controllers:[ MonthWiseController],
    providers:[MonthWiseService, MonthRepository]
})

export class MonthWiseModule{}