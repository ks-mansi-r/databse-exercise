import {
    IsOptional,
    IsString,
    IsArray,
    ArrayNotEmpty,
    IsNumber,
  } from 'class-validator';
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { Transform, Type } from 'class-transformer';
  
  export class GetExcelDto {

    
    @IsOptional()
    @Transform(({ value }) => value.split(','))
    @IsArray()
    @IsString({ each: true })
    @ArrayNotEmpty()
    isoCodes?: string[];
  

    
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    year?: number;
  }