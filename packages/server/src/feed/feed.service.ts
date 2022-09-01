import { Inject, Injectable, Logger } from '@nestjs/common';
import { SQLITE_PROVIDER } from '../sqlite';
import { Feed } from 'feed';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';

export const FEED_FILE_NAME = 'website.rss';
export const FEED_FILE_PATH = path.join(process.cwd(), FEED_FILE_NAME);

const GENERATE_INTERVAL =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'debug'
    ? CronExpression.EVERY_MINUTE
    : CronExpression.EVERY_HOUR;

@Injectable()
export class FeedService {
  isGenerating: boolean = false;
  logger = new Logger(FeedService.name);

  constructor(@Inject(SQLITE_PROVIDER.provide) private database) { }

  @Cron(GENERATE_INTERVAL)
  async generate() {
    if (this.isGenerating) {
      this.logger.log('generating feed: skip');
      return;
    }

    this.logger.log('generating feed: start');
    this.isGenerating = true;

    try {
      const feed = new Feed({
        title: 'Feblr Offical',
        description: 'This is offical feed of www.feblr.com!',
        id: 'https://www.feblr.com/',
        link: 'https://www.feblr.com/',
        language: 'en',
        image: 'https://www.feblr.com/image.png',
        favicon: 'https://www.feblr.com/favicon.ico',
        copyright: 'All rights reserved 2022, Feblr',
        updated: new Date(),
        generator: 'Feblr Feed',
        feedLinks: {
          rss: 'https://www.feblr.com/website.rss'
        },
        author: {
          name: 'Feblr',
          email: 'dont@www.feblr.com',
          link: 'https://www.feblr.com/',
        },
      });

      const content = feed.rss2();
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(FEED_FILE_PATH, content, {
        encoding: 'utf-8',
      });
    } catch (e: any) {
      this.logger.log('generating feed: abort');
      this.logger.error(e, e.stack);
    } finally {
      this.logger.log('generating feed: stop');
      this.isGenerating = false;
    }
  }
}
