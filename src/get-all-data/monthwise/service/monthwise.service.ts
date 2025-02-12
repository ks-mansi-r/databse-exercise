import { Injectable } from '@nestjs/common';
import { MonthRepository } from '../repository/mwise.repository';

@Injectable()
export class MonthWiseService {
  constructor(private readonly monthRepository: MonthRepository) {}

  async getCountryCases(
    fromDate?: string,
    toDate?: string,
    confirmedGte?: number,
    confirmedLte?: number,
  ) {
    return this.monthRepository.getCountryCase(fromDate, toDate, confirmedGte, confirmedLte);
  }
}
