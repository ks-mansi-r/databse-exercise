import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddCountryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 3)
  isoCode: string;

  @IsString()
  flag?: string;
}
