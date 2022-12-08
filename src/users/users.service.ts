import { Injectable } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'
import { Prisma, users as Users } from '@prisma/client'
import { UserListDto } from './dto/response/userList.dto'
import { UserCreateDto } from './dto/request/UserCreateDto.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsersAll(): Promise<{ users: UserListDto[]; pagination: number }> {
    const take = 5
    const users = await this.userRepository.findUsersAll()
    const usersCount = await this.userRepository.getUsersCount({})
    const pagination = Math.ceil(usersCount / take)
    return { users: users, pagination: pagination }
  }

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

  async findUserById(id: number): Promise<Users> {
    return await this.userRepository.findUserById(id)
  }

  async createUser(user: UserCreateDto) {
    const item: Prisma.usersUncheckedCreateInput = {
      userName: user.userName,
      password: user.password,
      address: user.address,
      age: user.age,
      departmentId: user.departmentId,
      point: null,
      createdAt: new Date(),
      updateAt: new Date()
    }
    return await this.userRepository.createUser(item)
  }

  // async updateUser(params: { where: Prisma.usersWhereUniqueInput; data: Prisma.usersUpdateInput }): Promise<Users> {
  //   const { where, data } = params
  //   return this.prisma.users.update({
  //     where,
  //     data
  //   })
  // }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id)
  }
}
