import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UserRepository } from './repository/user.repository'

@Module({
  controllers: [UsersController],
  providers: [PrismaClient, PrismaService, UsersService, UserRepository]
})
export class UsersModule {}
