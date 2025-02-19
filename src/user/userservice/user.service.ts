import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return user;
}
}
