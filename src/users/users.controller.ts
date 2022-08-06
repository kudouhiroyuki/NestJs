import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.service.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<Users> {
    return await this.service.getUser(Number(id));
  }
  
  @Post()
  async createUser(@Body() user: Users): Promise<InsertResult> {
    return this.service.createUser(user);
  }
}