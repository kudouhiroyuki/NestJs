import { Injectable } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'
import { Prisma, users as Users } from '@prisma/client'
import { DepartmentsGetResponseDto } from './dto/response/departmentsResponse.dto'
import { UsersGetResponseDto } from './dto/response/usersResponse.dto'
import { UsersCreatePostRequestDto } from './dto/request/usersCreateRequest.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findDepartmentsAll(): Promise<DepartmentsGetResponseDto[]> {
    return await this.userRepository.findDepartmentsAll()
  }

  async findUsersAll(): Promise<UsersGetResponseDto> {
    const users = await this.userRepository.findUsersAll()
    const usersCount = await this.userRepository.getUsersCount()
    const pagination = Math.ceil(usersCount / 5)
    return new UsersGetResponseDto(users, pagination)
  }

  async findUsers(id: number, startDate: string, endDate: string, pageNumber: number): Promise<UsersGetResponseDto> {
    const users = await this.userRepository.findUsers(id, startDate, endDate, pageNumber, 5)
    const usersCount = await this.userRepository.getUsersCount(id, startDate, endDate)
    const pagination = Math.ceil(usersCount / 5)
    console.log(users)
    return new UsersGetResponseDto(users, pagination)
  }

  async findUserById(id: number): Promise<Users> {
    return await this.userRepository.findUserById(id)
  }

  async createUser(user: UsersCreatePostRequestDto) {
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
    return await this.userRepository.createUser(item)
  }

  async updateUser(user: UsersCreatePostRequestDto) {
    const item: Prisma.usersUncheckedUpdateInput = {
      userName: user.userName,
      password: user.password,
      address: user.address,
      age: user.age,
      departmentId: user.departmentId,
      point: null,
      createdAt: user.createdAt,
      updateAt: new Date()
    }
    const updateArgs: Prisma.usersUpdateArgs = {
      data: item,
      where: { id: Number(user.id) }
    }
    return await this.userRepository.updateUser(updateArgs)
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id)
  }
}
