import { Test, TestingModule } from '@nestjs/testing';
import { NoticeRegistService } from './notice_regist.service';

describe('NoticeRegistService', () => {
  let service: NoticeRegistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticeRegistService],
    }).compile();

    service = module.get<NoticeRegistService>(NoticeRegistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
