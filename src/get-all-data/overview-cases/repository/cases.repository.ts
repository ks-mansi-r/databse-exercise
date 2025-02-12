import { Repository } from "typeorm";
import { TimeSeries } from "src/timeseries/entity/timeseries.entity";
import { Country } from "src/country/entity/country.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class CcasesRepository extends Repository<TimeSeries> {
  constructor(
          private datasource: DataSource
      ){
          super(TimeSeries, datasource.createEntityManager());
      }
  

  public async getCases(fromDate?: string, toDate?: string, countryCode?: string) {
    
    // Start by creating a query builder for the 'timeseries' entity
    let query = this.createQueryBuilder("timeseries")
      .leftJoinAndSelect("timeseries.country", "country");

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
    const timeSeriesData = await query.getMany();

    // / Initialize an accumulator object to hold the total counts
    return timeSeriesData.reduce(
      (acc: { confirmed: number; deaths: number; recovered: number }, record: TimeSeries) => {
        
        // Sum up the confirmed cases from each record
        acc.confirmed += record.confirmed;

        // Sum up the deaths from each record
        acc.deaths += record.deaths;

        // Sum up the recovered cases from each record
        acc.recovered += record.recovered;
        return acc;
      },
      { confirmed: 0, deaths: 0, recovered: 0 }
    );
  }
}
