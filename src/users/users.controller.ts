import { Controller, Get, Post, Put, Delete, Query, Body, Param, Render } from '@nestjs/common'
import { UsersService } from './users.service'
import { users as Users } from '@prisma/client'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Render('users/index')
  // @Query() query: { id: number; userName: string; sort: 'asc' | 'desc' }
  // notifications.controller.ts
  // members.controller.ts
  async getIndex() {
    const users = await this.usersService.findUsersAll()
    return {
      users: JSON.stringify(users)
    }
  }

  // @Post()
  // async createUser(
  //   @Body()
  //   user: {
  //     userName: string
  //     password: string
  //     address: string
  //     age: string
  //     departmentId: string
  //     point: number
  //     createdAt: string
  //     updateAt: string
  //   }
  // ): Promise<Users> {
  //   return await this.usersService.createUser(user)
  // }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() user: Users): Promise<Users> {
  //   return this.usersService.updateUser({
  //     where: { id: Number(id) },
  //     data: user
  //   })
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<Users> {
  //   return await this.usersService.deleteUser({ id: Number(id) })
  // }
}
