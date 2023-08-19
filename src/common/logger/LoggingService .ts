import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const DEFAULT_LOGGING_LEVEL = 5;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger implements LoggerService {
  private logLevel: number;
  constructor(private readonly configService: ConfigService) {
    super();
    this.logLevel =
      configService.get('LOGGING_LEVEL') !== undefined
        ? parseInt(configService.get('LOGGING_LEVEL'))
        : DEFAULT_LOGGING_LEVEL;
  }
  log(message: any) {
    if (this.logLevel >= 2) {
      super.log(message);
    }
  }

  error(message: any, stackOrContext?: string) {
    if (this.logLevel >= 0) {
      super.error(message, stackOrContext);
    }
  }

  warn(message: any) {
    if (this.logLevel >= 1) {
      super.warn(message);
    }
  }

  debug(message: any) {
    if (this.logLevel >= 3) {
      super.debug(message);
    }
  }

  verbose(message: any) {
    if (this.logLevel >= 4) {
      super.verbose(message);
    }
  }
}
