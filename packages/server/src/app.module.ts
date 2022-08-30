import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SQLITE_PROVIDER } from './sqlite';
import { FeedService } from './feed/feed.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SQLITE_PROVIDER, FeedService],
})
export class AppModule { }
