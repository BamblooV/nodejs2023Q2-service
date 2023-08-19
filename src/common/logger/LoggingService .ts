import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger implements LoggerService {
  private logLevel = 0;
  constructor() {
    super();
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

  setLogLevel(level: number): void {
    this.logLevel = level;
  }
}
