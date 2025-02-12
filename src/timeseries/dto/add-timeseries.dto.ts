import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class AddTimeSeriesDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  confirmed: number;

  @IsNotEmpty()
  @IsInt()
  deaths: number;

  @IsNotEmpty()
  @IsInt()
  recovered: number;

  @IsNotEmpty()
  @IsInt()
  countryId: number;
}
