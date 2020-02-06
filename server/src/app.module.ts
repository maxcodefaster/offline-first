import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import SuperloginConfig from './config/superlogin-config';

import { SuperloginController } from './superlogin/superlogin.controller';
import { superloginProvider } from './superlogin/superlogin';
import { SuperloginMiddleware } from './superlogin/superlogin.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SuperloginConfig],
    }),
  ],
  controllers: [AppController, SuperloginController],
  providers: [AppService, superloginProvider],
  // providers: [AppService, SuperloginService],
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SuperloginMiddleware)
      .forRoutes('auth');
  }
}