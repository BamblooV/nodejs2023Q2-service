import {
  Body,
  ConflictException,
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
  UserCreatingError,
  UserNotFoundError,
} from '../../common/errors';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';

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

  @Post('signup')
  @Public()
  async signup(@Body() signupDto: CreateUserDto) {
    try {
      return await this.authService.signup(signupDto);
    } catch (error) {
      if (error instanceof UserCreatingError) {
        throw new ConflictException();
      }
      throw error;
    }
  }
}
