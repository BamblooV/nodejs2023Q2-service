import { Module } from '@nestjs/common';
import { LoggingService } from './LoggingService ';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {}
