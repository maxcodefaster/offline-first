import { Test, TestingModule } from '@nestjs/testing';
import { Superlogin } from './superlogin';

describe('Superlogin', () => {
  let provider: Superlogin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Superlogin],
    }).compile();

    provider = module.get<Superlogin>(Superlogin);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
