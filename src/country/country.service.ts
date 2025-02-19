import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entity/country.entity';
import { AddCountryDto } from './dto/add-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ConflictException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CountrysRepository } from './repository/country.repository';

@Injectable()
export class CountryService {

  constructor(
    private readonly countryRepository: CountrysRepository,
    private readonly dataSource: DataSource,
  ) { }

  async addCountry(data: AddCountryDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.countryRepository.addCountry(data);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateCountry(id: number, data: UpdateCountryDto) {
    return await this.countryRepository.updateCountry(id, data);
  }

  async deleteCountry(id: number) {
    return await this.countryRepository.deleteCountry(id);
  }

  async getCountry(id: number) {
    return await this.countryRepository.getCountry(id);
  }
}