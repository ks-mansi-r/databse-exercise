import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetExcelDto } from './dto/get-excel-data.dto';
import { ExcelService } from './services/excel.service';


@Controller('excel')

export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}
  @Get()
 
  async downloadCovidData(@Query() query: GetExcelDto, @Res() res: Response) {
    try {
      const { isoCodes, year } = query;
      const workbook = await this.excelService.generateExcel(isoCodes, year);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=covid-data.xlsx',
      );

      await workbook.xlsx.write(res);
      res.send();
    } catch (error) {
      console.log('error by excel', error);
      res.status(500).send('internal server error');
    }
  }
}