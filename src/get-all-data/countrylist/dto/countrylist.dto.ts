import { IsOptional, IsString } from "class-validator";

export class CountryList{



    @IsString()
    @IsOptional()
    name?: string;


    @IsString()
    @IsOptional()
    isoCode?: string;
}