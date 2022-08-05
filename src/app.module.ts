import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/users.entity';
import { UsersModule } from './users/users.module';

// 施設管理（お知らせ登録・お知らせ照会）
import { NoticeRegistModule } from './institution/notice_regist/notice_regist.module';
import { NoticeInquiryModule } from './institution/notice_inquiry/notice_inquiry.module';

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
    NoticeInquiryModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
