import { Controller, Get } from "@nestjs/common";
import { OverviewService } from "./service/overviewcases.service";
import { CountryCasesDto } from "./dto/overviewcases.dto";
import { Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('countrycases')
@ApiTags('Cases')
export class OverviewController{
    constructor(

        private readonly overviewService: OverviewService,
    ){}

    @Get()
    @ApiOperation({
        summary: 'Get overview of cases from all countries',
      })
      @ApiResponse({
        status: 200,
        description: 'Countries data fetched successfully based on the query',
      })
      @ApiQuery({
        name: 'fromDate',
        type: 'string',
        required: false,
        description: 'return countries data based on query',
        example: '2020-01-11',
      })
      @ApiQuery({
        name: 'toDate',
        type: 'string',
        required: false,
        description: 'return countries data based on query',
        example: '2020-01-25',
      })
      @ApiQuery({
        name: 'countryCode',
        type: 'string',
        required: false,
        description: 'return country based on the code given in query',
        example: 'IN',
      })
    public getCases(@Query() getCases:CountryCasesDto ) {
        const { fromDate, toDate, countryCode } = getCases;
        return this.overviewService.GetCases(fromDate, toDate, countryCode);
      }
}