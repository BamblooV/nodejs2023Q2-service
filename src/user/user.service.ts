import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interface/user.interface';
import secureUser from '../common/utils/secureUser';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}
  create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const date = Date.now();
    const user: User = {
      id,
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.db.users.push(user);

    return secureUser(user);
  }

  findAll() {
    return this.db.users.map((user) => {
      return secureUser(user);
    });
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return secureUser(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return secureUser(user);
  }

  remove(id: string) {
    const user = this.findOne(id);

    this.db.users = this.db.users.filter((u) => u.id !== user.id);
  }
}
