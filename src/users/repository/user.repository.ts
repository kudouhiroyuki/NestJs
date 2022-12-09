import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { Prisma, users as Users } from '@prisma/client'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUsersAll(): Promise<Users[]> {
    return await this.prisma.users.findMany({})
  }

  async findUsers(whereConditions: object, take: number, skip: number): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: whereConditions,
      take: take,
      skip: skip
    })
  }

  async findUserById(id: number): Promise<Users> {
    return await this.prisma.users.findFirst({ where: { id: id } })
  }

  async getUsersCount(whereConditions: object): Promise<number> {
    return await this.prisma.users.count({
      where: whereConditions
    })
  }

  async createUser(user: Prisma.usersUncheckedCreateInput) {
    return await this.prisma.users.create({
      data: user
    })
  }

  async updateUser(user: Prisma.usersUpdateArgs) {
    return await this.prisma.users.update(user)
  }

  async deleteUser(id: number) {
    return await this.prisma.users.delete({ where: { id: id } })
  }
}
