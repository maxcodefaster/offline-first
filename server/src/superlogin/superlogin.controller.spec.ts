import { Test, TestingModule } from '@nestjs/testing';
import { SuperloginController } from './superlogin.controller';

describe('Superlogin Controller', () => {
  let controller: SuperloginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperloginController],
    }).compile();

    controller = module.get<SuperloginController>(SuperloginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
