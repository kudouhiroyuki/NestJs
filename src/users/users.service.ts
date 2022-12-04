import { Injectable } from '@nestjs/common'
import { UsersRepository } from './repository/users.repository'
import { UserListDto } from './dto/response/userList.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
    const users = await this.usersRepository.findUsers(whereConditions, take, skip)
    const usersCount = await this.usersRepository.getUsersCount(whereConditions)
    const pagination = Math.ceil(usersCount / take)
    return { users: users, pagination: pagination }
  }

  // // query: { id: number; userName: string; sort: 'asc' | 'desc' }
  // async findUsersAll(): Promise<any> {
  //   // const whereConditions = {}
  //   // const orderConditions = {}
  //   // if (query.id) whereConditions['id'] = Number(query.id)
  //   // if (query.userName) whereConditions['userName'] = { contains: query.userName }
  //   // if (query.sort) orderConditions['id'] = query.sort
  //   return await this.prisma.users.findMany({
  //     select: {
  //       id: true,
  //       userName: true,
  //       password: true,
  //       address: true,
  //       age: true,
  //       departmentId: true,
  //       point: true,
  //       createdAt: true,
  //       updateAt: true
  //     }
  //     // where: whereConditions,
  //     // orderBy: orderConditions,
  //     // skip: 0
  //   })
  // }

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
