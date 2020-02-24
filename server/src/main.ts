import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';
import { SuperloginModule } from './superlogin/superlogin-module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.enableCors();
  app.useStaticAssets(join(__dirname, '.', 'superlogin/email-templates'));
  SuperloginModule.setup('/auth', app);
  await app.listen(3000);
}
bootstrap();
