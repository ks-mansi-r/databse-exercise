import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class GetTopCountries {
 
    @ApiPropertyOptional({
            description: 'Enter the starting date',
            example: 'India',
          })
  @IsOptional()
  @IsDateString()
  fromDate?: string;


  @ApiPropertyOptional({
        description: 'Enter the ending date',
        example: 'India',
      })
  @IsOptional()
  @IsDateString()
  toDate?: string;


  @ApiPropertyOptional({
        description:
          'Enter the number fot top N countries with highest number of confirmed cases',
        example: 10,
      })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(15)
  @IsNotEmpty()
  top: number;
}