import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddCountryDto {

  @ApiProperty({
    description: ' Name of the Country.',
    example: 'India',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'isoCode of the country',
    example: 'IN',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 3)
  isoCode: string;

  @ApiProperty({
    description: ' Flag of the country.',
    example: 'IN',
  })
  @IsString()
  flag?: string;
}
