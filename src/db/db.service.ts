import { Injectable } from '@nestjs/common';
import { Album } from '../api/album/interface/album.interface';
import { Artist } from '../api/artist/interface/artist.interface';
import { Track } from '../api/track/interface/track.interface';
import { User } from '../api/user/interface/user.interface';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}
