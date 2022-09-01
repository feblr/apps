import { Controller, Get, Header, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { FEED_FILE_NAME, FEED_FILE_PATH } from './feed/feed.service';

@Controller()
export class AppController {
  constructor() {}

  @Get(FEED_FILE_NAME)
  @Header('Content-Type', 'application/xml')
  getRSS(@Res() res) {
    const file = createReadStream(FEED_FILE_PATH);
    file.pipe(res);
  }
}
