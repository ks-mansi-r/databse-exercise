import { Controller, Get, Query } from '@nestjs/common';
import { GetMonthCases } from './dto/getmonthcases.dto';
import { MonthWiseService } from './service/monthwise.service';

@Controller('month-wise')
export class MonthWiseController {
  constructor(private readonly mwisecasesService: MonthWiseService) {}

  @Get()
  public async getCases(@Query() getMonthCases: GetMonthCases) {
    const { fromDate, toDate, confirmedGte, confirmedLte } = getMonthCases;
    return this.mwisecasesService.getCountryCases(
      fromDate,
      toDate,
      confirmedGte,
      confirmedLte,
    );
  }
}
