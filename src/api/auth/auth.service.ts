import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogInUserDto } from './dto/login-user.dto';
import { ForbiddenOperationError } from '../../common/errors';
import { JwtService } from '@nestjs/jwt';

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
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
