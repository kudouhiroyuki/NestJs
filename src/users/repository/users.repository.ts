import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { users as Users } from '@prisma/client'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUsers(whereConditions: object, take: number, skip: number): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: whereConditions,
      take: take,
      skip: skip
    })
  }
  async getUsersCount(whereConditions: object): Promise<number> {
    return await this.prisma.users.count({
      where: whereConditions
    })
  }
}
