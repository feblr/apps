import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { Feed } from '@feblr/model';
import { FeedService } from './feed.service';

@Controller('/api/v1/feeds')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post('/')
  async createFeed(@Body() feed: Feed) {
    return await this.feedService.create(feed);
  }

  @Delete('/:feedId')
  async removeFeed() {}
}
