/**
 * ORM（typeORMの場合）
 */
// import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';
// import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
// import { UsersService } from './users.service';
// import { Users } from '../entities/users.entity';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly service: UsersService) {}

//   @Get()
//   async getUsers(@Query() query: {id: number, user_name: string, sort: "ASC" | 1 | "DESC" | -1, limit: number, page_number: number}): Promise<{users: Users[], total_record_count: number}> {
//     return await this.service.getUsers(query);
//   }

//   @Get(':id')
//   async getUser(@Param('id') id: string): Promise<Users> {
//     return await this.service.getUser(Number(id));
//   }

//   @Post()
//   async createUser(@Body() user: Users): Promise<InsertResult> {
//     return this.service.createUser(user);
//   }

//   @Put(':id')
//   async updateUser(@Param('id') id: string, @Body() user: Users): Promise<UpdateResult> {
//     return this.service.updateUser(Number(id), user);
//   }

//   @Delete(':id')
//   async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
//     return await this.service.deleteUser(Number(id));
//   }
// }

/**
 * ORM（Prismaの場合）
 */
import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { users as Users } from '@prisma/client'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(@Query() query: { id: number; user_name: string; sort: 'asc' | 'desc' }): Promise<Users[]> {
    return await this.service.getUsers(query)
  }

  @Post()
  async createUser(
    @Body()
    user: {
      user_name: string
      password: string
      address: string
      age: string
      department_id: string
      point: number
    }
  ): Promise<Users> {
    return await this.service.createUser(user)
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: Users): Promise<Users> {
    return this.service.updateUser({
      where: { id: Number(id) },
      data: user
    })
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Users> {
    return await this.service.deleteUser({ id: Number(id) })
  }
}
