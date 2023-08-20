import {
  Inject,
  Injectable,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
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
import { BadTokenError } from '../../common/errors/BadTokenError';

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

    return await this.generateTokens(payload);
  }

  async signup(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { id: user.id };
    } catch (error) {
      throw new UserCreatingError();
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    let login: string, userId: string;
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        { secret: process.env.JWT_SECRET_REFRESH_KEY },
      );
      login = payload.login;
      userId = payload.userId;
    } catch (error) {
      throw new BadTokenError();
    }

    const user = await this.userService.findOne(userId);

    if (user.login !== login) {
      throw new BadTokenError();
    }

    return await this.generateTokens({ login, userId });
  }

  private async generateTokens(payload: JwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      }),
    };
  }
}
