import { Module } from '@nestjs/common';
import { NoticeInquiryController } from './notice_inquiry.controller';
import { NoticeInquiryService } from './notice_inquiry.service';

@Module({
  controllers: [NoticeInquiryController],
  providers: [NoticeInquiryService]
})
export class NoticeInquiryModule {}
