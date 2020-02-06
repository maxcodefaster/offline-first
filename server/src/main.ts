import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuperloginModule } from './superlogin/superlogin-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SuperloginModule.setup('/auth', app);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
