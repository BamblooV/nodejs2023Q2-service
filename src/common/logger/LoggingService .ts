import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
import { stat, appendFile } from 'node:fs/promises';
import { mkdirSync, writeFileSync } from 'node:fs';
import { cwd } from 'node:process';

const DEFAULT_LOGGING_LEVEL = 5;
const KiB = 1024;

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private logLevel: number;
  private logFileSize: number;
  private loggingDirectory: string;
  private currentLoggingFile: string;
  private currentErrorFile: string;

  private shouldCreateNewFileLog = false;
  private shouldCreateNewFileErrors = false;

  constructor(private readonly configService: ConfigService) {
    super();
    this.logLevel =
      configService.get('LOGGING_LEVEL') !== undefined
        ? parseInt(configService.get('LOGGING_LEVEL'))
        : DEFAULT_LOGGING_LEVEL;

    this.logFileSize = parseInt(configService.get('LOG_FILE_SIZE')) || 10;
    this.loggingDirectory = this.normalizePath('logs');

    this.currentLoggingFile = this.saltFileName('logs.log');
    this.currentErrorFile = this.saltFileName('errors.log');

    mkdirSync(this.loggingDirectory, { recursive: true });
    writeFileSync(
      path.join(this.loggingDirectory, this.currentLoggingFile),
      '',
    );
    writeFileSync(path.join(this.loggingDirectory, this.currentErrorFile), '');
  }
  log(message: any) {
    if (this.logLevel >= 2) {
      super.log(message);
      const formattedMsg = new Date().toISOString() + ' LOG ' + message + '\n';
      this.logToFile(formattedMsg);
    }
  }

  error(message: any, stackOrContext?: string) {
    if (this.logLevel >= 0) {
      super.error(message, stackOrContext);
      const formattedMsg =
        new Date().toISOString() + ' ERROR ' + message + '\n';
      this.errorToFile(formattedMsg);
    }
  }

  warn(message: any) {
    if (this.logLevel >= 1) {
      super.warn(message);
      const formattedMsg = new Date().toISOString() + ' WARN ' + message + '\n';
      this.logToFile(formattedMsg);
    }
  }

  debug(message: any) {
    if (this.logLevel >= 3) {
      super.debug(message);
      const formattedMsg =
        new Date().toISOString() + ' DEBUG ' + message + '\n';
      this.logToFile(formattedMsg);
    }
  }

  verbose(message: any) {
    if (this.logLevel >= 4) {
      super.verbose(message);
      const formattedMsg =
        new Date().toISOString() + ' VERBOSE ' + message + '\n';
      this.logToFile(formattedMsg);
    }
  }

  private saltFileName(filename: string) {
    return new Date().toISOString().replaceAll(':', '-') + filename;
  }

  private normalizePath(target: string) {
    return path.isAbsolute(target)
      ? path.normalize(target)
      : path.join(cwd(), target);
  }

  private async checkFileLog(target: string) {
    if (this.shouldCreateNewFileLog) {
      return false;
    }
    let fileSizeByte: number;
    try {
      fileSizeByte = (await stat(target)).size;
    } catch (error) {
      this.shouldCreateNewFileLog = true;
    }
    if (fileSizeByte > Math.floor(this.logFileSize * KiB * 0.95)) {
      this.shouldCreateNewFileLog = true;
    }
  }

  private async checkFileError(target: string) {
    if (this.shouldCreateNewFileErrors) {
      return false;
    }
    let fileSizeByte: number;
    try {
      fileSizeByte = (await stat(target)).size;
    } catch (error) {
      this.shouldCreateNewFileErrors = true;
    }
    if (fileSizeByte > Math.floor(this.logFileSize * KiB * 0.95)) {
      this.shouldCreateNewFileErrors = true;
    }
  }

  private async logToFile(message: string) {
    let targetPath = path.join(this.loggingDirectory, this.currentLoggingFile);
    await this.checkFileLog(targetPath);
    if (this.shouldCreateNewFileLog) {
      this.currentLoggingFile = this.saltFileName('logs.log');
      targetPath = path.join(this.loggingDirectory, this.currentLoggingFile);
      this.shouldCreateNewFileLog = false;
    }
    try {
      await this.appendToFile(targetPath, message);
    } catch (error) {
      console.error('Error on storing logs: ', error);
    }
    process.nextTick(() => (this.shouldCreateNewFileLog = false));
  }

  private async errorToFile(message: string) {
    let targetPath = path.join(this.loggingDirectory, this.currentErrorFile);
    await this.checkFileError(targetPath);
    if (this.shouldCreateNewFileErrors) {
      this.currentErrorFile = this.saltFileName('errors.log');
      targetPath = path.join(this.loggingDirectory, this.currentErrorFile);
    }
    try {
      await this.appendToFile(targetPath, message);
    } catch (error) {
      console.error('Error on storing logs: ', error);
    }
    process.nextTick(() => (this.shouldCreateNewFileErrors = false));
  }

  private async appendToFile(target: string, message: string) {
    await appendFile(target, message, { flag: 'a', encoding: 'utf-8' });
  }
}
