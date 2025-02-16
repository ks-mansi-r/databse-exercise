import { IsDateString, IsOptional, IsString } from 'class-validator';


export class CountryCasesDto {
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @IsString()
  countryCode?: string;
}