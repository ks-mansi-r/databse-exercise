import { Controller, Get, Query } from '@nestjs/common';
import { GetMonthCases } from './dto/getmonthcases.dto';
import { MonthWiseService } from './service/monthwise.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('month-wise')
@ApiTags('Month wise Cases')
export class MonthWiseController {
  constructor(private readonly mwisecasesService: MonthWiseService) {}

  @Get()
  @ApiOperation({
    summary: 'Get cases numbers month wise',
  })
  @ApiResponse({
    status: 200,
    description:
      'Month wise countries cases data fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'fromDate',
    type: 'string',
    required: false,
    description: 'return monthwise countries total data based on query',
    example: '2020-01-11',
  })
  @ApiQuery({
    name: 'toDate',
    type: 'string',
    required: false,
    description: 'return monthwise countries total data based on query',
    example: '2020-01-25',
  })
  @ApiQuery({
    name: 'confirmedGte',
    type: 'number',
    required: false,
    description: 'return monthwise total data based on given in query',
    example: 500,
  })
  @ApiQuery({
    name: 'confirmedLte',
    type: 'number',
    required: false,
    description: 'return monthwise total data based on given in query',
    example: 500,
  })
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
