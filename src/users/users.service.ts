import { Injectable } from '@nestjs/common'
import { UsersRepository } from './repository/users.repository'
import { UserListDto } from './dto/response/userList.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers(
    id: string,
    createdAt: string,
    pageNumber: string
  ): Promise<{ users: UserListDto[]; pagination: number }> {
    const take = 5
    let skip = 0
    const whereConditions = {}
    if (id) whereConditions['id'] = Number(id)
    if (createdAt) whereConditions['createdAt'] = createdAt
    if (pageNumber) skip = (Number(pageNumber) - 1) * take
    console.log(whereConditions)
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
