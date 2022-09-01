import { Body, Controller, Post } from '@nestjs/common';

@Controller('feed')
export class FeedController {
    @Post()
    createItem() { }
}
