import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(new Date().toISOString(), 'LOG ', message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(new Date().toISOString(), 'ERROR ', message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(new Date().toISOString(), 'WARN ', message);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log(new Date().toISOString(), 'DEBUG ', message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(new Date().toISOString(), 'VERBOSE ', message);
  }

  // setLogLevels(levels: LogLevel[]) {
  //   console.log('levels ', levels);
  // }
}
