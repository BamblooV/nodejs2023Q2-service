import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from '../logger/LoggingService ';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {
    logger.setContext('LoggerMiddleware');
  }
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, body, params } = req;
    this.logger.log(
      `URL: ${baseUrl} \t PARAMS: ${JSON.stringify(
        params,
      )} \t BODY: ${JSON.stringify(body)}`,
    );

    next();
  }
}
