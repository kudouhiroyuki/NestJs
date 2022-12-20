import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { users as Users } from '@prisma/client'

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}

  async findLoginUser(id: string, password: string): Promise<Users> {
    return await this.prisma.users.findFirst({ where: { id: Number(id), password: password } })
  }
}
