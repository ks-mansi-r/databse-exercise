import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "src/country/entity/country.entity";
import { CountryListController } from "./countrylist.controller";
import { CountryListService } from "./service/countrylist.service";
import { CountryRepository } from "./repository/country.repository";

@Module({
    controllers:[CountryListController],
    providers:[CountryListService, CountryRepository],
    imports: [ TypeOrmModule.forFeature([Country])],
    
})

export class CountryListModule {}