import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/rss.xml')
  @Header("Content-Type", "application/xml")
  getRSS(): string {
    return this.appService.getFeed();
  }
}
