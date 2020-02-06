import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


import { superloginConfig } from './config/superlogin-config';
import { SuperloginModule } from './superlogin/superlogin-module';

import { SuperloginController } from './superlogin/superlogin.controller';
import { signupHandler } from './superlogin/signup-handler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SuperloginModule.forRoot(superloginConfig),
  ],
  controllers: [AppController, SuperloginController],
  providers: [AppService],
})
export class AppModule {

  constructor(@Inject('superlogin') private superlogin: any) {
    this.superlogin.on('signup', signupHandler);
  }
}