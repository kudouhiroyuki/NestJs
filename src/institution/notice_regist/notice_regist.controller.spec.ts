import { Test, TestingModule } from '@nestjs/testing';
import { NoticeRegistController } from './notice_regist.controller';

describe('NoticeRegistController', () => {
  let controller: NoticeRegistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeRegistController],
    }).compile();

    controller = module.get<NoticeRegistController>(NoticeRegistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
