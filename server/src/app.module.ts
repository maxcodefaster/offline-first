import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import SuperloginConfig from './config/superlogin-config';

import { SuperloginController } from './superlogin/superlogin.controller';
import { superloginProvider } from './superlogin/superlogin';

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
export class AppModule {}
