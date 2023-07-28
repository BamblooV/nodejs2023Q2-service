import { Injectable } from '@nestjs/common';
import { Track } from 'src/track/interface/track.interface';
import { User } from 'src/user/interface/user.interface';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
}
