import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger implements LoggerService {
  log(message: any) {
    super.log(message);
  }

  error(message: any) {
    super.error(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }
}
