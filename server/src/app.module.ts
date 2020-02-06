import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperloginController } from './superlogin/superlogin.controller';
import SuperloginConfig from './config/superlogin-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SuperloginConfig],
    }),
  ],
  controllers: [AppController, SuperloginController],
  providers: [AppService],
})
export class AppModule {}
