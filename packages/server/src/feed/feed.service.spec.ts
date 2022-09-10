import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from './feed.service';

describe('FeedService', () => {
  let service: FeedService;

  beforeEach(async () => {
    const sqlite = {
      provide: 'SQLITE_PROVIDER',
      useFactory: async () => {
        return {};
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedService, sqlite],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
