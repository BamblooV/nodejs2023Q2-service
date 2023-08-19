import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './common/logger/LoggingService ';
import { AllExceptionsFilter } from './common/exception-filters/all.exceptions.filter';
import process from 'node:process';

const DEFAULT_LOGGING_LEVEL = 5;
const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const configService: ConfigService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  const logger = await app.resolve(LoggingService);

  const LOG_LEVEL =
    configService.get('LOGGING_LEVEL') !== undefined
      ? parseInt(configService.get('LOGGING_LEVEL'))
      : DEFAULT_LOGGING_LEVEL;

  logger.setLogLevel(LOG_LEVEL);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  const PORT = parseInt(configService.get('PORT')) || DEFAULT_PORT;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);

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
