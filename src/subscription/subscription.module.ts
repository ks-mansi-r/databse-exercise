import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';
import { Subscription } from './entity/subscription.entity';
import { User } from 'src/user/user.entity';
import { Country } from 'src/country/entity/country.entity';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';  
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, User, Country, TimeSeries]), 
    ScheduleModule.forRoot(),  
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
