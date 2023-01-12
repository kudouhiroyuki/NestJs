import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

import { UserRepository } from './repository/user.repository'
import { DepartsmentsGetResponseDto } from './dto/response/departmentsResponse.dto'
import {
  UsersGetResponseDto,
  UsersRelationGetResponseDto,
  UsersCopyGetResponseDto
} from './dto/response/usersResponse.dto'
import { UsersCreatePostRequestDto } from './dto/request/usersCreateRequest.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository, private prismaClient: PrismaClient) {}

  async findDepartmentsAll(): Promise<DepartsmentsGetResponseDto[]> {
    return await this.userRepository.findDepartmentsAll()
  }

  async findUsersAll(): Promise<{ users: UsersRelationGetResponseDto[]; pagination: number }> {
    const users = await this.userRepository.findUsersAll()
    const usersCount = await this.userRepository.getUsersCount()
    const pagination = Math.ceil(usersCount / 5)
    return { users, pagination }
  }

  async findUsers(
    id: number,
    startDate: string,
    endDate: string,
    pageNumber: number
  ): Promise<{ users: UsersRelationGetResponseDto[]; pagination: number }> {
    const users = await this.userRepository.findUsers(id, startDate, endDate, pageNumber, 5)
    const usersCount = await this.userRepository.getUsersCount(id, startDate, endDate)
    const pagination = Math.ceil(usersCount / 5)
    return { users, pagination }
  }

  async findUserById(id: number): Promise<UsersGetResponseDto> {
    return await this.userRepository.findUserById(id)
  }

  async findUserByCopyId(copyId: number): Promise<UsersCopyGetResponseDto> {
    const users = await this.userRepository.findUserById(copyId)
    if (users) {
      delete users.id
      delete users.point
      delete users.createdAt
      delete users.updateAt
    }
    return users
  }

  async createUser(user: UsersCreatePostRequestDto): Promise<void> {
    return await this.prismaClient.$transaction(async (prismaTransaction) => {
      const item: Prisma.usersUncheckedCreateInput = {
        userName: user.userName,
        password: user.password,
        address: user.address,
        age: user.age,
        departmentId: user.departmentId,
        point: 0,
        createdAt: new Date(),
        updateAt: new Date()
      }
      await this.userRepository.createUser(prismaTransaction, item)
    })
  }

  async updateUser(id: number, user: UsersCreatePostRequestDto): Promise<void> {
    const item: Prisma.usersUncheckedUpdateInput = {
      userName: user.userName,
      password: user.password,
      address: user.address,
      age: user.age,
      departmentId: user.departmentId,
      point: user.point,
      createdAt: user.createdAt,
      updateAt: new Date()
    }
    const updateArgs: Prisma.usersUpdateArgs = {
      data: item,
      where: { id }
    }
    await this.userRepository.updateUser(updateArgs)
  }

  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id)
  }
}
