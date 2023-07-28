import { Exclude } from 'class-transformer';
import { User } from '../interface/user.interface';

export class UserEntity implements User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
