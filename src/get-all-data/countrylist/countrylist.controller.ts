import { Controller, Get, Query } from "@nestjs/common";
import { CountryList } from "./dto/countrylist.dto";
import { CountryListService } from "./service/countrylist.service";

@Controller('countrylist')

export class CountryListController{

    constructor(
        private readonly countrieService: CountryListService,
    )
   {} 
   @Get()
    public CountryList(@Query() countryList: CountryList){

        const { name, isoCode }= countryList;
        return this.countrieService.CountryList(name,isoCode);
    }

}