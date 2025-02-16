import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entity/country.entity';
import { AddCountryDto } from './dto/add-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ConflictException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    // inject datasource
    private readonly dataSource: DataSource,

  ) { }

  async addCountry(data: AddCountryDto) {

    //Create a query runner
    const queryRunner = this.dataSource.createQueryRunner();


    //connect query runner 
    await queryRunner.connect();

    //start Transaction
    await queryRunner.startTransaction();
    try {

    } catch (error) {
      throw new RequestTimeoutException(
        'Not connect to the database',
      );
    }

    // if the ISO code already exists, return a 409 Conflict error.
    try {
      const exists = await this.countryRepository.findOne({ where: { isoCode: data.isoCode } });


      const country = this.countryRepository.create(data);
      return this.countryRepository.save(country);
    }
    catch (error) {
      throw new ConflictException(
        'Data is already exist for this Iso Code',
        {
          description: String(error),
        },
      );
    }
    finally{
      try{
        //release the connection 
        await queryRunner.release();
  
      }
      catch(error){
        throw new RequestTimeoutException(
  
          'NOt Release the connection ',
          {
            description:String(Error),
          }
        );
  
      }
    }
  }

  //update country
  async updateCountry(id: number, data: UpdateCountryDto) {


    try {
      const country = await this.countryRepository.findOne({ where: { id } });
      if (!country) {
        throw new BadRequestException('Country not found.');
      }

      Object.assign(country, data);
      return this.countryRepository.save(country);
    } catch (error) {
      throw new NotFoundException(
        'For this ID country is not found',
      );
    }
  }

  async deleteCountry(id: number) {

    try{
    const country = await this.countryRepository.findOne({ where: { id }, relations: ['timeseries'] });

    if (!country) {
      throw new BadRequestException('Country not found.');
    }

    if (country.timeseries.length > 0) {
      throw new BadRequestException('Cannot delete country with existing time series data.');
    }

    return this.countryRepository.remove(country);
  }catch(error){
    throw new NotFoundException(
      'Data is not available for this date and country'
    )
  }
  }

  async getCountry(id: number) {

    //if the countryId is not found, return a 404 error with an appropriate error message.

    try {
      return this.countryRepository.findOne({ where: { id }, relations: ['timeseries'] });
    }
    catch (error) {
      throw new NotFoundException('Country is not found for this id ');
    }
  }
}