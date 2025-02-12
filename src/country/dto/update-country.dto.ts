import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 3)
  isoCode?: string;

  @IsOptional()
  @IsString()
  flag?: string;
}
