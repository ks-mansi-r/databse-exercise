import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entity/country.entity';
import { AddCountryDto } from './dto/add-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ConflictException } from '@nestjs/common';
@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async addCountry(data: AddCountryDto) {

     // if the ISO code already exists, return a 409 Conflict error.
   try{
    const exists = await this.countryRepository.findOne({ where: { isoCode: data.isoCode } });
 
    
    const country = this.countryRepository.create(data);
    return this.countryRepository.save(country);
   }
   catch(error){
    throw new ConflictException(
      'Data is already exist for this Iso Code',
      {
        description:String(error),
      },
    );
  }
  }

  //update country
  async updateCountry(id: number, data: UpdateCountryDto) {
    const country = await this.countryRepository.findOne({ where: { id } });
    if (!country) {
      throw new BadRequestException('Country not found.');
    }

    Object.assign(country, data);
    return this.countryRepository.save(country);
  }

  async deleteCountry(id: number) {
    const country = await this.countryRepository.findOne({ where: { id }, relations: ['timeseries'] });

    if (!country) {
      throw new BadRequestException('Country not found.');
    }

    if (country.timeseries.length > 0) {
      throw new BadRequestException('Cannot delete country with existing time series data.');
    }

    return this.countryRepository.remove(country);
  }

  async getCountry(id: number) {
    return this.countryRepository.findOne({ where: { id }, relations: ['timeseries'] });
  }
}