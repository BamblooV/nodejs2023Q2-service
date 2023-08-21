import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from '../logger/LoggingService ';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, body, params } = req;
    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `Request: URL: ${baseUrl} \t PARAMS: ${JSON.stringify(
          params,
        )} \t BODY: ${JSON.stringify(body)}`,
      );
      this.logger.log(`Response: statusCode ${statusCode}`);
    });

    next();
  }
}
