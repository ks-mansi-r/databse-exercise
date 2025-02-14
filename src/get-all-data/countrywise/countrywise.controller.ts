import { Controller, Get } from "@nestjs/common";
import { Query } from "@nestjs/common";
import { CwisecasesService } from "./service/countrywise.service";
import { getCountryCase } from "./dto/countrywise.dto";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('countrywise')
export class CountryWiseController{
    constructor(private readonly countryWiseCase:CwisecasesService) {}


    @Get()
    @ApiOperation({
      summary: 'Get cases numbers country wise',
    })
    @ApiResponse({
      status: 200,
      description: 'Countries cases data fetched successfully based on the query',
    })
    @ApiQuery({
      name: 'fromDate',
      type: 'string',
      required: false,
      description: 'return countries total data based on query',
      example: '2020-01-11',
    })
    @ApiQuery({
      name: 'toDate',
      type: 'string',
      required: false,
      description: 'return countries total data based on query',
      example: '2020-01-25',
    })
    @ApiQuery({
      name: 'confirmedGte',
      type: 'number',
      required: false,
      description: 'return total data based on given in query',
      example: 500,
    })
    @ApiQuery({
      name: 'confirmedLte',
      type: 'number',
      required: false,
      description: 'return total data based on given in query',
      example: 500,
    })
    public getCases(@Query() countryWiseCases: getCountryCase ) {
        const { fromDate, toDate, confirmedGte, confirmedLte } = countryWiseCases;
        return this.countryWiseCase.getCountryCase(
          fromDate,
          toDate,
          confirmedGte,
          confirmedLte,
        );
      }
}