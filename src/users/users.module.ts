import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service'
import { UsersRepository } from './repository/users.repository'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository]
})
export class UsersModule {}
