import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Country } from "src/country/entity/country.entity";

@Injectable()
export class CountryRepository extends Repository<Country>{
    constructor(
        private datasource: DataSource
    ){
        super(Country, datasource.createEntityManager());
    }

   public  async GetCountryList(name?: string, isoCode?:string){

        const whereConditions: any = {};
  
        if (name) {
          whereConditions.name = name; 
          // Exact match for country name
        }
      
        if (isoCode) {
          whereConditions.isoCode = isoCode; 
          // Exact match for ISO code
        }

        return await this.find({ where: whereConditions });
    }
}