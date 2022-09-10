import { Inject, Injectable, Logger } from '@nestjs/common';
import { Sqlite, SQLITE_PROVIDER } from '../sqlite';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import { isDebug } from '../config';
import { Feed } from '@feblr/model';

export const FEED_FILE_NAME = 'website.rss';
export const FEED_FILE_PATH = path.join(process.cwd(), FEED_FILE_NAME);

const GENERATE_INTERVAL = isDebug
  ? CronExpression.EVERY_MINUTE
  : CronExpression.EVERY_HOUR;

@Injectable()
export class FeedService {
  isGenerating: boolean = false;
  logger = new Logger(FeedService.name);

  constructor(@Inject(SQLITE_PROVIDER.provide) private database: Sqlite) {}

  async create(feed: Feed) {
    try {
      const result = await this.database.run(
        `
      INSERT INTO feeds(id, content)
      VALUES (:id, :content)
      ON CONFLICTS(id) DO UPDATE SET content = :content, updated_at = :now
      `,
        {
          id: feed.id,
          content: JSON.stringify(feed),
          now: Date.now(),
        },
      );

      if (result.changes === 0) {
        throw new Error('can not create feed');
      }

      return {
        id: feed.id,
      };
    } catch (e: unknown) {
      if (e instanceof Error) {
        this.logger.error(e.message, e.stack);
      } else {
        this.logger.error(e);
      }
    }
  }

  removeItem() {}

  @Cron(GENERATE_INTERVAL)
  async generate() {
    if (this.isGenerating) {
      this.logger.log('generating feed: skip');
      return;
    }

    this.logger.log('generating feed: start');
    this.isGenerating = true;

    try {
    } catch (e: any) {
      this.logger.log('generating feed: abort');
      this.logger.error(e, e.stack);
    } finally {
      this.logger.log('generating feed: stop');
      this.isGenerating = false;
    }
  }
}
