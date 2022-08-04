import { Module } from '@nestjs/common';
import { NoticeRegistController } from './notice_regist.controller';
import { NoticeRegistService } from './notice_regist.service';

@Module({
  controllers: [NoticeRegistController],
  providers: [NoticeRegistService]
})
export class NoticeRegistModule {}
