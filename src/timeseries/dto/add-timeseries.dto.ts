import { IsDateString, IsInt, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTimeSeriesDto {
  @ApiProperty({
    description: 'Date must be in YYYY-MM-DD format.',
    example: '2025-01-01',
    type: String,
  })
  @Matches(/^\d{4}-\d{1,2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'The number of confirmed cases.',
    example: 1000,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  confirmed: number;

  @ApiProperty({
    description: 'The number of deaths.',
    example: 1000,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  deaths: number;

  @ApiProperty({
    description: 'The number of recovered cases.',
    example: 1000,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  recovered: number;

  @ApiProperty({
    description:'Country Id',
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  countryId: number;
}
