import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SuperloginMiddleware implements NestMiddleware {

  constructor() {}

  use(req: any, res: any, next: () => void) {
    next();
  }
}
