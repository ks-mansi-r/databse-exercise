import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './userservice/user.service';
import { CountryModule } from 'src/country/country.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    CountryModule,
  
  ],
  providers: [
    UserService,
   
  ],
  exports: [UserService,], 
})
export class UserModule {}
