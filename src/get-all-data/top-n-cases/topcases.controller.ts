import { Controller, Get, Query } from '@nestjs/common';
import { TopCasesService } from './service/topcases.service';
import { GetTopCountries } from './dto/get-top-countries.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('top-cases')
@ApiTags('Top N countries')
export class TopCasesController {
  constructor(private readonly topCasesService: TopCasesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get top N countries with highest confirmed cases',
  })
  @ApiResponse({
    status: 200,
    description:
      'Response contains top N countries with highest number of confirmed cases',
  })
  @ApiQuery({
    name: 'fromDate',
    type: 'string',
    required: false,
    description: 'return top N countries data based on query',
    example: '2020-01-11',
  })
  @ApiQuery({
    name: 'toDate',
    type: 'string',
    required: false,
    description: 'return top N countries data based on query',
    example: '2020-01-25',
  })
  @ApiQuery({
    name: 'top',
    type: 'number',
    required: false,
    description: 'return top N countries data based on in query',
    example: 5,
  })
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
