import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogInUserDto } from './dto/login-user.dto';
import {
  ForbiddenOperationError,
  UserCreatingError,
} from '../../common/errors';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/JwtPayload.interface';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(user: LogInUserDto) {
    const storedUser = await this.userService.findOneByLogin(user.login);

    const isValidPassword = await bcrypt.compare(
      user.password,
      storedUser.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenOperationError();
    }

    const payload: JwtPayload = {
      userId: storedUser.id,
      login: storedUser.login,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      }),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { id: user.id };
    } catch (error) {
      throw new UserCreatingError();
    }
  }
}
