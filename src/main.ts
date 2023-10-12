import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession=require('cookie-session')
import * as dotenv from 'dotenv';  
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['asdfadfsd']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )
  await app.listen(3000);
}
bootstrap();
