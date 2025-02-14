import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCountryDto {
  @ApiProperty({
    description: 'Name of the country',
    example: 'India',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'isocode of the country',
    example: 'IN',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 3)
  isoCode?: string;

  @ApiProperty({
    description: 'flag of the country',
    example: 'IN',
    required: false,
  })
  @IsOptional()
  @IsString()
  flag?: string;
}
