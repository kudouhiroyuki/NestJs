/**
* ORM（typeORMの場合）
*/
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';;
// import { Users } from '../entities/users.entity';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
//   imports: [TypeOrmModule.forFeature([Users])],
// })
// export class UsersModule {
// }


/**
* ORM（Prismaの場合）
*/
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService
  ],
})
export class UsersModule {
}