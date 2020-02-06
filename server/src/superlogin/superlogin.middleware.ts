import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { superloginProvider } from './superlogin';

@Injectable()
export class SuperloginMiddleware implements NestMiddleware {

  constructor(@Inject(superloginProvider) private readonly superlogin) {}

  use(req: any, res: any, next: () => void) {
    this.superlogin.router;
    next();
  }
}
