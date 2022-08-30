import { Test, TestingModule } from '@nestjs/testing';
import { SQLITE_PROVIDER, Sqlite } from './sqlite';

describe('Sqlite', () => {
  let provider;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SQLITE_PROVIDER],
    }).compile();

    provider = module.get<Sqlite>(SQLITE_PROVIDER.provide);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
