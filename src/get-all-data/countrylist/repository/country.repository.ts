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

   public  async GetCountryList(name?: string, isoCode?:string)
   :Promise<Country[]>{
    const query = this.createQueryBuilder('country');
      
  
        if (name) {
         query.andWhere('country.name=:name',{ name });
          // Exact match for country name
        }
      
        if (isoCode) {
         query.andWhere('country.isoCode=:isoCode',{ isoCode });
          // Exact match for ISO code
        }

        return await query.getMany();
    }
}