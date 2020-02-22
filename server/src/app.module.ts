import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { superloginConfig } from './config/superlogin-config';
import { SuperloginModule } from './superlogin/superlogin-module';
import { dbSetup } from './db-setup';
import { signupHandler } from './superlogin/signup-handler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SuperloginModule.forRoot(superloginConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(@Inject('superlogin') private superlogin: any) {
    this.superlogin.on('signup', signupHandler);
    dbSetup();
  }
}