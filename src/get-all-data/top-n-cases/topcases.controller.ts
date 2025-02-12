import { Controller, Get, Query } from '@nestjs/common';
import { TopCasesService } from './service/topcases.service';
import { GetTopCountries } from './dto/get-top-countries.dto';

@Controller('top-cases')
export class TopCasesController {
  constructor(private readonly topCasesService: TopCasesService) {}

  @Get()
  public getCases(@Query() getTopCountries: GetTopCountries) {
    const { fromDate, toDate, top } = getTopCountries;

    // Provide default values if fromDate or toDate are undefined
    const from = fromDate ?? '';
    const to = toDate ?? '';

     // Convert 'top' to a string if it's defined; otherwise, use an empty string
     const topStr = top !== undefined ? top.toString() : '';

    return this.topCasesService.getCountryCases(from, to, topStr);
  }
}
