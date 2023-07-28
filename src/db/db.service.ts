import { Injectable } from '@nestjs/common';
import { Album } from '../api/album/interface/album.interface';
import { Artist } from '../api/artist/interface/artist.interface';
import { Track } from '../api/track/interface/track.interface';
import { UserEntity } from '../api/user/entity/user.entity';
import { Favorites } from '../api/favorites/interface/favotites.interface';

@Injectable()
export class DBService {
  users: UserEntity[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
