// cwisecases.service.ts
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CwiseRepository } from '../repository/cwise.repository';

@Injectable()
export class CwisecasesService {
  constructor(
    
    private readonly timeseriesRepo: CwiseRepository,
  ) {}

  public async getCountryCase(
    fromDate?: string,
    toDate?: string,
    confirmedGte?: number,
    confirmedLte?: number,
  ) {
    return this.timeseriesRepo.getCountryCase(fromDate, toDate, confirmedGte, confirmedLte);
  }
}
