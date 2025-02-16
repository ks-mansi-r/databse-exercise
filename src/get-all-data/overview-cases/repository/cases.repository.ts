import { Repository } from "typeorm";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { Country } from "src/country/entity/country.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class CcasesRepository extends Repository<TimeSeries> {
  constructor(
    private datasource: DataSource
  ) {
    super(TimeSeries, datasource.createEntityManager());
  }


  public async getCases(fromDate?: string, toDate?: string, countryCode?: string) {

    // Start by creating a query builder for the 'timeseries' entity
    let query = this.createQueryBuilder("timeseries")
      .select('SUM(timeseries.confirmed)', 'confirmed')
      .addSelect('SUM(timeseries.deaths)', 'deaths')
      .addSelect('SUM(timeseries.recovered)', 'recovered')
      .innerJoin('timeseries.country', 'country');

    // If a specific country code is provided, filter the results by that country code
    if (countryCode) {
      query = query.where("country.code = :countryCode", { countryCode });
    }

    //Include record from date
    if (fromDate) {
      query = query.andWhere("timeseries.date >= :fromDate", { fromDate });
    }

    if (toDate) {
      query = query.andWhere("timeseries.date <= :toDate", { toDate });
    }

    // Execute the query and retrieve the matching 'TimeSeries' records
    const timeSeriesData = await query.getRawOne();

    return {
      confirmed: Number(timeSeriesData?.confirmed) || 0,
      deaths: Number(timeSeriesData?.deaths) || 0,
      recovered: Number(timeSeriesData?.recovered) || 0,
    };
  }
}
