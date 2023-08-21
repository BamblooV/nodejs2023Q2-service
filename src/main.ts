import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './common/logger/LoggingService ';
import { AllExceptionsFilter } from './common/exception-filters/all.exceptions.filter';
import process from 'node:process';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  const logger = await app.resolve(LoggingService);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  const PORT = parseInt(configService.get('PORT')) || DEFAULT_PORT;
  await app.listen(PORT);
  logger.log(`Server started on port ${PORT}`);

  process.on('uncaughtException ', (reason) => {
    logger.log('uncaughtException');
    logger.error(reason);
    throw reason;
  });

  process.on('unhandledRejection', (reason) => {
    logger.log('unhandledRejection');
    logger.error(reason);
  });

  // For uncaughtException checking
  // throw Error('oops from main')
  // For rejectionHandled checking
  // process.emit('rejectionHandled', Promise.reject('value on reject'));
}
bootstrap();
