import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
<<<<<<< HEAD
  getHello(): string {
    return 'Hello World!';
=======
  // eslint-disable-next-line @typescript-eslint/ban-types
  getHello(): Object {
    return { title: 'Hello Youtube!' };
>>>>>>> 969748e (new url git repo)
  }
}
