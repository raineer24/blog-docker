import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
<<<<<<< HEAD
  getHello(): string {
=======
  // eslint-disable-next-line @typescript-eslint/ban-types
  getHello(): Object {
>>>>>>> 969748e (new url git repo)
    return this.appService.getHello();
  }
}
