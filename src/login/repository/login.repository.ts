import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}
}
