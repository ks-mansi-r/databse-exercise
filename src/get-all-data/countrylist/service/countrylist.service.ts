import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Country } from "src/country/entity/country.entity";
import { Like } from "typeorm";
import { CountryRepository } from "../repository/country.repository";

@Injectable()
export class CountryListService{
    constructor(

        //Inject country repository
        @InjectRepository(CountryRepository)
        private readonly countryrepository: CountryRepository
    ){}

public async CountryList(name?: string, isoCode?: string): Promise<Country[]> {
   
  
    return await this.countryrepository.GetCountryList( name, isoCode );
  }
  
  
    }
