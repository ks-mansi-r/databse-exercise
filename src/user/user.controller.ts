import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './userservice/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.userService.createUser(body.email, body.password);
  }

  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}
