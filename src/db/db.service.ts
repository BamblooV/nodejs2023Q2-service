import { Injectable } from '@nestjs/common';
import { Album } from '../api/album/interface/album.interface';
import { Artist } from '../api/artist/interface/artist.interface';
import { Track } from '../api/track/interface/track.interface';
import { UserEntity } from '../api/user/entities/user.entity';
import { Favorites } from '../api/favorites/interface/favorites.interface';
import { DBNotFound } from '../common/errors';

export const enum DBEntities {
  users = 'users',
  tracks = 'tracks',
  artists = 'artists',
  albums = 'albums',
}

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

  isEntityExist(id, entityType: DBEntities) {
    if (id) {
      const repository: (UserEntity | Track | Artist | Album)[] =
        this[entityType];
      const entity = repository.find((entity) => entity.id === id);

      if (!entity) {
        throw new DBNotFound(entityType);
      }
    }

    return true;
  }
}
