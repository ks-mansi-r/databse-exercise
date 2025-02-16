import { Injectable } from '@nestjs/common';

import { TopcasesRepository } from '../repository/topcases.repository';

export interface CountryCaseData {
  country: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
}

@Injectable()
export class TopCasesService {
  constructor(private readonly topcasesRepository: TopcasesRepository) {}

 public  async getCountryCases(
    country: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<CountryCaseData> {
    const timeSeriesData = await this.topcasesRepository.findByCountryAndDateRange(
      country,
      fromDate,
      toDate,
    );

    const totalConfirmed = timeSeriesData.reduce(
      (sum, entry) => sum + entry.confirmed,
      0,
    );
    const totalDeaths = timeSeriesData.reduce(
      (sum, entry) => sum + entry.deaths,
      0,
    );
    const totalRecovered = timeSeriesData.reduce(
      (sum, entry) => sum + entry.recovered,
      0,
    );

    return {
      country,
      totalConfirmed,
      totalDeaths,
      totalRecovered,
    };
  }
}
