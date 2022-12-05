import { Injectable } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'
import { UserListDto } from './dto/response/userList.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(
    id: string,
    startDate: string,
    endDate: string,
    pageNumber: string
  ): Promise<{ users: UserListDto[]; pagination: number }> {
    const take = 5
    const skip = pageNumber ? (Number(pageNumber) - 1) * take : 0
    const whereConditions = {}
    const createdAt = {}
    if (id) whereConditions['id'] = Number(id)
    if (startDate) createdAt['gte'] = new Date(startDate)
    if (endDate) createdAt['lte'] = new Date(endDate)
    whereConditions['createdAt'] = createdAt
    const users = await this.userRepository.findUsers(whereConditions, take, skip)
    const usersCount = await this.userRepository.getUsersCount(whereConditions)
    const pagination = Math.ceil(usersCount / take)
    return { users: users, pagination: pagination }
  }

  // async createUser(data: {
  //   userName: string
  //   password: string
  //   address: string
  //   age: string
  //   departmentId: string
  //   point: number
  //   createdAt: string
  //   updateAt: string
  // }): Promise<Users> {
  //   return await this.prisma.users.create({ data })
  // }

  // async updateUser(params: { where: Prisma.usersWhereUniqueInput; data: Prisma.usersUpdateInput }): Promise<Users> {
  //   const { where, data } = params
  //   return this.prisma.users.update({
  //     where,
  //     data
  //   })
  // }

  // async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users> {
  //   return await this.prisma.users.delete({ where })
  // }
}
