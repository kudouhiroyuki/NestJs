import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './entities/users.entity';
import { NoticeRegistModule } from './institution/notice_regist/notice_regist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [Users],
      synchronize: true,
    }),
    UsersModule,
    NoticeRegistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
