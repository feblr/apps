import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SQLITE_PROVIDER } from './sqlite';
import { FeedService } from './feed/feed.service';
import { ScheduleModule } from '@nestjs/schedule';
import { FeedController } from './feed/feed.controller';

@Module({
  controllers: [AppController, FeedController],
  providers: [SQLITE_PROVIDER, FeedService],
  imports: [ScheduleModule.forRoot()],
})
export class AppModule {}
