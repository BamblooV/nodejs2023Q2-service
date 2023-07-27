import { Injectable } from '@nestjs/common';
import { User } from 'src/user/interface/user.interface';

@Injectable()
export class DbService {
  users: User[] = [];
}
