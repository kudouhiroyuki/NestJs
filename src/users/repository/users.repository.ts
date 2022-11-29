import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { users as Users } from '@prisma/client'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUsers(whereConditions: object): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: whereConditions
    })
  }
}
