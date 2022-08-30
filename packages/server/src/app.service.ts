import { Injectable } from '@nestjs/common';
import { FeedService } from './feed/feed.service';

@Injectable()
export class AppService {
  constructor(private feedService: FeedService) { }

  getFeed(): string {
    return this.feedService.read();
  }
}
