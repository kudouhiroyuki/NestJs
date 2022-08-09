import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/users.entity';
import { UsersModule } from './users/users.module';

// 施設管理（お知らせ登録・お知らせ照会）
import { NoticeModule } from './institution/notice/notice.module';

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
    NoticeModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
