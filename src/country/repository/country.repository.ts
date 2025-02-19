import { Repository, DataSource } from 'typeorm';
import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Country } from '../entity/country.entity';
import { AddCountryDto } from '../dto/add-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';

@Injectable()
export class CountrysRepository extends Repository<Country> {
  constructor(private readonly dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }

  async addCountry(data: AddCountryDto) {
    const exists = await this.findOne({ where: { isoCode: data.isoCode } });
    if (exists) {
      throw new ConflictException('Data already exists for this ISO code.');
    }

    const country = this.create(data);
    return await this.save(country);
  }

  async updateCountry(id: number, data: UpdateCountryDto) {
    const country = await this.findOne({ where: { id } });
    if (!country) {
      throw new NotFoundException('Country not found.');
    }

    Object.assign(country, data);
    return await this.save(country);
  }

  async deleteCountry(id: number) {
    const country = await this.findOne({ where: { id }, relations: ['timeseries'] });
    if (!country) {
      throw new NotFoundException('Country not found.');
    }

    if (country.timeseries.length > 0) {
      throw new BadRequestException('Cannot delete country with existing time series data.');
    }

    return await this.remove(country);
  }

  async getCountry(id: number) {
    const country = await this.findOne({ where: { id }, relations: ['timeseries'] });
    if (!country) {
      throw new NotFoundException('Country not found for this ID.');
    }
    return country;
  }
}
