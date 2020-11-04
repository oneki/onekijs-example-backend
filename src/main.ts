import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  
  const keyFile  = fs.readFileSync(process.env.LETSENCRYPT_PRIVATE_KEY);
  const certFile = fs.readFileSync(process.env.LETSENCRYPT_CERT);
  const app = await NestFactory.create(AppModule/*, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  }*/);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
