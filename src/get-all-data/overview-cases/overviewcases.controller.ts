import { Controller, Get } from "@nestjs/common";
import { OverviewService } from "./service/overviewcases.service";
import { CountryCasesDto } from "./dto/overviewcases.dto";
import { Query } from "@nestjs/common";


@Controller('countrycases')
export class OverviewController{
    constructor(

        private readonly overviewService: OverviewService,
    ){}

    @Get()
    public getCases(@Query() getCases:CountryCasesDto ) {
        const { fromDate, toDate, countryCode } = getCases;
        return this.overviewService.GetCases(fromDate, toDate, countryCode);
      }
}