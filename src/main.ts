import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './common/logger/LoggingService ';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  app.useLogger(await app.resolve(LoggingService));
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = parseInt(configService.get('PORT')) || 4000;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
