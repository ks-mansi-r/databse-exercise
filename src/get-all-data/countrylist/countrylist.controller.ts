import { Controller, Get, Query } from "@nestjs/common";
import { CountryList } from "./dto/countrylist.dto";
import { CountryListService } from "./service/countrylist.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('countrylist')
@ApiTags('Countries List')
export class CountryListController{

    constructor(
        private readonly countrieService: CountryListService,
    )
   {} 
   @Get()
   @ApiOperation({
    summary: 'Fetches a list of Countries',
  })
  @ApiResponse({
    status: 200,
    description: 'Countries fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    description: 'return countries based on query',
    example: 'India',
  })
  @ApiQuery({
    name: 'isoCode',
    type: 'string',
    required: false,
    description: 'return country based on the code given in query',
    example: 'In',
  })
    public CountryList(@Query() countryList: CountryList){

        const { name, isoCode }= countryList;
        return this.countrieService.CountryList(name,isoCode);
    }

}