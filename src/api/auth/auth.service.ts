import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogInUserDto } from './dto/login-user.dto';
import {
  ForbiddenOperationError,
  UserCreatingError,
} from '../../common/errors';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(user: LogInUserDto) {
    const storedUser = await this.userService.findOneByLogin(user.login);

    if (user.password !== storedUser.password) {
      throw new ForbiddenOperationError();
    }

    const payload = { userId: storedUser.id, login: storedUser.login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
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
