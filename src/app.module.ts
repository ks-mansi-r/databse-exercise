import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeSeries } from './timeseries/entity/timeseries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country/entity/country.entity';
import { CountryModule } from './country/country.module';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { CountryListModule } from './get-all-data/countrylist/countrylist.module';
import { OverviewCasesModule } from './get-all-data/overview-cases/overviewcases.module';
import { CountryWiseModule } from './get-all-data/countrywise/countrywise.module';
import { MonthWiseModule } from './get-all-data/monthwise/monthwise.module';
import { TopCasesModule } from './get-all-data/top-n-cases/topcases.module';
import { ExcelModule } from './get-all-data/excel/excel.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { QueueModule } from './queue/queue.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { User } from './user/user.entity';


// import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { Subscription } from './subscription/entity/subscription.entity';


const ENV = process.env.NODE_ENV;

@Module({
  imports: [CountryModule,
  TimeseriesModule,
  CountryListModule,
  OverviewCasesModule,
  CountryWiseModule,
  MonthWiseModule,
  TopCasesModule,
  ExcelModule,
  FileUploadModule,

  
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'covid_api',
    entities: [Country, TimeSeries, User, Subscription],
    synchronize: true,
    autoLoadEntities: true,
  }),

    MailerModule.forRoot({
      transport: {
        host:'sandbox.smtp.mailtrap.io',
        auth: {
          user:'86b945783fadf1' ,
          pass:'060d297c859bfc',
        },
      },
    }),


  QueueModule,
  UserModule,
  SubscriptionModule,
 
],
  controllers: [AppController,],
  providers: [AppService,
 
    ],
})
export class AppModule {}
