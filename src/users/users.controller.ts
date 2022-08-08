import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';


// curl -X GET "http://localhost:3000/users?limit=1"
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(@Query() query): Promise<Users[]> {
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

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: Users): Promise<UpdateResult> {
    return this.service.updateUser(Number(id), user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return await this.service.deleteUser(Number(id));
  }
}