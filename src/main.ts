import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: process.env.LETSENCRYPT_PRIVATE_KEY,
      cert: process.env.LETSENCRYPT_CERT,
    },
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
