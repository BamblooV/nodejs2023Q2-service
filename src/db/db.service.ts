import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/interface/artist.interface';
import { Track } from 'src/track/interface/track.interface';
import { User } from 'src/user/interface/user.interface';
import { Album } from '../album/interface/album.interface';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}
