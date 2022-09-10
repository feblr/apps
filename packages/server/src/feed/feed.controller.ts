import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Feed, verify } from '@feblr/model';
import { FeedService } from './feed.service';
import { webcrypto } from 'node:crypto';

@Controller('/api/v1/feeds')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post('/')
  async createFeed(@Body() feed: Feed) {
    const isValid = await verify(webcrypto.subtle, feed);
    if (!isValid) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const result = await this.feedService.create(feed);
    if (!result) {
      throw new HttpException(
        'Interval Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Delete('/:feedId')
  async removeFeed() {}
}
