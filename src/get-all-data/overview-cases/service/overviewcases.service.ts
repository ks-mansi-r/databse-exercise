import { Injectable } from "@nestjs/common";
import { Country } from "src/country/entity/country.entity";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CcasesRepository } from "../repository/cases.repository";
import { Repository } from "typeorm";
@Injectable()

export class OverviewService{

    constructor(
        @InjectRepository(CcasesRepository)
        private readonly ccasesRepository: CcasesRepository,
    
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>
    ){}

    public async GetCases(fromDate?: string, toDate?: string, countryCode?: string) {
        return await this.ccasesRepository.getCases(fromDate, toDate, countryCode);
      }

}