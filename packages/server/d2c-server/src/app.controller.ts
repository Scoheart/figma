import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/d2c')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {}

  @Post('/')
  returnHello() {}

  @Post('/path')
  returnHello2() {}
}
