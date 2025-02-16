import {
  Controller,
  Post,
  Patch,
  Put,
  Delete,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { AddCountryDto } from './dto/add-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({
    summary: 'Add country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly add country data',
  })
  public addCountry(@Body() dto: AddCountryDto) {
    return this.countryService.addCountry(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly update country data',
  })
  public updateCountry(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCountryDto) {
    return this.countryService.updateCountry(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly delete country data',
  })
  public deleteCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.deleteCountry(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get country by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly get country data for specific id',
  })
  public getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getCountry(id);
  }
}
