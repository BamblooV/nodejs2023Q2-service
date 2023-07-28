import { Injectable } from '@nestjs/common';
import { Album } from '../api/album/interface/album.interface';
import { Artist } from '../api/artist/interface/artist.interface';
import { Track } from '../api/track/interface/track.interface';
import { UserEntity } from '../api/user/entity/user.entity';

@Injectable()
export class DbService {
  users: UserEntity[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}
