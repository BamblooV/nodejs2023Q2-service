import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ForbiddenOperationError,
  UserNotFoundError,
} from '../../common/errors';
import { UserEntity } from './entities/user.entity';
import { DbService } from '../../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.db.userRepository.create(createUserDto);

    return await this.db.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.db.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.db.userRepository.findOne({
      where: {
        id,
      },
    });

    if (user === null) {
      throw new UserNotFoundError(id);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenOperationError();
    }

    await this.db.userRepository.update(id, {
      password: updateUserDto.newPassword,
    });

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.userRepository.delete(id);
  }

  async findOneByLogin(login: string) {
    const user = await this.db.userRepository.findOneBy({ login });

    if (user === null) {
      throw new UserNotFoundError(login);
    }

    return user;
  }
}
