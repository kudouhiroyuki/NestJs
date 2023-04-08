import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { user as User } from '@prisma/client'

@Injectable()
export class JwtAuthRepository {
  constructor(private prisma: PrismaService) {}

  async findJwtAuthUser(id: string, password: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { id: Number(id), password: password } })
  }
}
