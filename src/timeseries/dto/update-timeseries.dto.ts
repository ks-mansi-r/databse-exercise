import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateTimeSeriesDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsInt()
  confirmed?: number;

  @IsOptional()
  @IsInt()
  deaths?: number;

  @IsOptional()
  @IsInt()
  recovered?: number;
}
