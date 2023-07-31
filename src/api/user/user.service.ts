import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DBNotFound, ForbiddenOperation } from '../../common/errors';
import { DBEntities, DBService } from '../../db/db.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  create(createUserDto: CreateUserDto): UserEntity {
    const id = uuidv4();
    const date = Date.now();
    const user: UserEntity = new UserEntity({
      id,
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    this.db.users.push(user);

    return user;
  }

  findAll(): UserEntity[] {
    return this.db.users;
  }

  findOne(id: string): UserEntity {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new DBNotFound(DBEntities.users);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenOperation();
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);

    this.db.users = this.db.users.filter((u) => u.id !== user.id);
  }
}
