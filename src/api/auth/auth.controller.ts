import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/login-user.dto';
import {
  ForbiddenOperationError,
  UserNotFoundError,
} from '../../common/errors';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  async login(@Body() signInDto: LogInUserDto) {
    try {
      return await this.authService.logIn(signInDto);
    } catch (error) {
      if (error instanceof ForbiddenOperationError) {
        throw new ForbiddenException();
      }
      if (error instanceof UserNotFoundError) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }
}
