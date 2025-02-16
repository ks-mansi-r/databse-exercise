import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTimeSeriesDto {
  @ApiProperty({
    description: 'Date must be in YYYY-MM-DD format and unique.',
    example: '2025-01-01',
    type: String,
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    description: 'The number of confirmed cases.',
    example: 1000,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  confirmed?: number;

  @ApiProperty({
    description: 'The number of deaths.',
    example: 1000,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  deaths?: number;

  @ApiProperty({
    description: 'The number of recovered cases.',
    example: 1000,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  recovered?: number;
}
