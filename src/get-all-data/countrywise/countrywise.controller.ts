import { Controller, Get } from "@nestjs/common";
import { Query } from "@nestjs/common";
import { CwisecasesService } from "./service/countrywise.service";
import { getCountryCase } from "./dto/countrywise.dto";

@Controller('countrywise')
export class CountryWiseController{
    constructor(private readonly countryWiseCase:CwisecasesService) {}


    @Get()
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