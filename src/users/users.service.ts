import { Injectable } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'
import { Prisma, PrismaClient, users as Users } from '@prisma/client'
import { DepartmentsGetResponseDto } from './dto/response/departmentsResponse.dto'
import { UsersGetResponseDto } from './dto/response/usersResponse.dto'
import { UsersCreatePostRequestDto } from './dto/request/usersCreateRequest.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository, private prismaClient: PrismaClient) {}

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
    return new UsersGetResponseDto(users, pagination)
  }

  async findUserById(id: number): Promise<Users> {
    return await this.userRepository.findUserById(id)
  }

  async createUser(user: UsersCreatePostRequestDto) {
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

/*
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  PreconditionFailedException,
  InternalServerErrorException
} from '@nestjs/common'

■400 Bad Request（不正なリクエスト）
throw new BadRequestException('email auth code not found')

■401 Unauthorized（未認証）
throw new UnauthorizedException('can not authorize')

■404 Not Found（見つからない）
throw new NotFoundException('CouponId does not exist')
throw new NotFoundException('ordering not found')

■409 Conflict（競合）
throw new ConflictException('mail address is exists')
throw new ConflictException('target product is exists multiple')
throw new ConflictException('this coupon is already used')

■412 Precondition Failed（前提条件で失敗）
throw new PreconditionFailedException('token is invalid')
throw new PreconditionFailedException('invalid user')

■500 Internal Server Error
throw new InternalServerErrorException('many users')
*/
