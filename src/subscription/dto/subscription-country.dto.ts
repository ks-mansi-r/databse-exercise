

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class SubscribeCountryDto {
  @ApiProperty({
    description: 'Country ID that the user wants to subscribe to.',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  countryId: number;
}
