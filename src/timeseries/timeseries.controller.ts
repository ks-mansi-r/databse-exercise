import {
    Controller,
    Post,
    Patch,
    Delete,
    Get,
    Param,
    Body,
    ParseIntPipe,
    Put,
  } from '@nestjs/common';
  import { TimeSeriesService } from './timeseries.service';
  import { AddTimeSeriesDto } from './dto/add-timeseries.dto';
  import { UpdateTimeSeriesDto } from './dto/update-timeseries.dto';
  
  @Controller('timeseries')
  export class TimeSeriesController {
    constructor(private readonly timeSeriesService: TimeSeriesService) {}
  
    @Post()
    addTimeSeries(@Body() dto: AddTimeSeriesDto) {
      return this.timeSeriesService.addTimeSeries(dto);
    }
  
    @Put(':id')
    updateTimeSeries(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTimeSeriesDto) {
      return this.timeSeriesService.updateTimeSeries(id, dto);
    }
  
    @Delete(':id')
    deleteTimeSeries(@Param('id', ParseIntPipe) id: number) {
      return this.timeSeriesService.deleteTimeSeries(id);
    }
  
    @Get(':countryId')
    getTimeSeriesByCountry(@Param('countryId', ParseIntPipe) countryId: number) {
      return this.timeSeriesService.getTimeSeriesByCountry(countryId);
    }
  }
  