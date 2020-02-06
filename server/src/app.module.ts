import { Module, NestModule, MiddlewareConsumer, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { superloginConfig } from './config/superlogin-config';
import { SuperloginModule } from './superlogin/superlogin-module';

import { SuperloginController } from './superlogin/superlogin.controller';
import { loginHandler } from './login-handler';

@Module({
  imports: [
    SuperloginModule.forRoot(superloginConfig),
  ],
  controllers: [AppController, SuperloginController],
  providers: [AppService],
})
export class AppModule {

  constructor(@Inject('superlogin') private superlogin: any) {
    this.superlogin.on('signup', loginHandler);
  }
}