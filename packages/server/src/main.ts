import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
import { isDebug } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: isDebug,
      transform: true,
    }),
  );
  app.use(helmet());
  app.use(csurf());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
