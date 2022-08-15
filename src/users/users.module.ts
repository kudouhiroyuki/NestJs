// import { TypeOrmModule } from '@nestjs/typeorm' // typeORM（ORM）
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';;
// import { Users } from '../entities/users.entity'; // typeORM（ORM）

import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService // Prisma（ORM）
  ],
  // typeORM（ORM）
  // imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {
}
