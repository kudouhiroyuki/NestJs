import { Get, Controller, Render, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { users as Users } from '@prisma/client'
import { validate } from 'class-validator'
import { UserSearchDto, UserSearchCheckDto } from './dto/request/userSearch.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // https://github.com/typestack/class-validator
  // 正常系
  // http://localhost:3000/users?id=1&userName=名前&createdAt=2010-10-01
  // 異常系
  // http://localhost:3000/users?id=あ&userName=名前&createdAt=2010-10-0あ
  @Get('')
  @Render('users/index')
  async getIndex(@Query() query: UserSearchDto) {
    console.log(query.createdAt)
    console.log(typeof query.id)
    const errors = await validate(new UserSearchCheckDto(query))
    const users = await this.usersService.findUsers()
    return {
      errors: JSON.stringify(errors),
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
