import { Controller, Get } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.service.findAll();
  }
}