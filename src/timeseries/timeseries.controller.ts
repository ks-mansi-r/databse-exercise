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
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  @Controller('timeseries')
  export class TimeSeriesController {
    constructor(private readonly timeSeriesService: TimeSeriesService) {}
  
    @Post()
    @ApiOperation({
      summary: 'Add timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: ' add timeseries data',
    })
   public addTimeSeries(@Body() dto: AddTimeSeriesDto) {
      return this.timeSeriesService.addTimeSeries(dto);
    }
  
    @Put(':id')
    @ApiOperation({
      summary: 'Update timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: 'update timeseries data',
    })
    public updateTimeSeries(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTimeSeriesDto) {
      return this.timeSeriesService.updateTimeSeries(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Delete timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: ' delete timeseries data',
    })
    public deleteTimeSeries(@Param('id', ParseIntPipe) id: number) {
      return this.timeSeriesService.deleteTimeSeries(id);
    }
  
    @Get(':countryId')
    @ApiOperation({
      summary: 'get all timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: ' get timeseries data',
    })
    public getTimeSeriesByCountry(@Param('countryId', ParseIntPipe) countryId: number) {
      return this.timeSeriesService.getTimeSeriesByCountry(countryId);
    }
  }
  