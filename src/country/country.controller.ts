import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { AddCountryDto } from './dto/add-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  addCountry(@Body() dto: AddCountryDto) {
    return this.countryService.addCountry(dto);
  }

  @Patch(':id')
  updateCountry(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCountryDto) {
    return this.countryService.updateCountry(id, dto);
  }

  @Delete(':id')
  deleteCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.deleteCountry(id);
  }

  @Get(':id')
  getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getCountry(id);
  }
}
