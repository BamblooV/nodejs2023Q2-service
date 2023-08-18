import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from '../logger/LoggingService ';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, body, params } = req;
    this.logger.log(`URL: ${baseUrl}`);
    this.logger.log(`PARAMS: ${JSON.stringify(params)}`);
    this.logger.log(`BODY: ${JSON.stringify(body)}`);
    next();
  }
}
