import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { Artist } from '../artist/interface/artist.interface';
import { Track } from '../track/interface/track.interface';
import { Album } from '../album/interface/album.interface';
import { DBNotFound } from '../../common/errors';

enum Entites {
  tracks = 'tracks',
  albums = 'albums',
  artists = 'artists',
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type Entity = Artist | Track | Album;

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}
  findAll() {
    const entries = Object.entries(this.db.favs) as Entries<
      typeof this.db.favs
    >;
    const result = entries.reduce((acc, [key, collection]) => {
      acc[key] = collection.map((id) => {
        const table: (Track | Album | Artist)[] = this.db[key];

        return table.find((entity) => entity.id === id);
      });
      return acc;
    }, {});
    return result;
  }

  private addToFavorite(id: string, entity: Entites) {
    const index = this.db[entity].findIndex(
      (entity: Entity) => entity.id === id,
    );

    if (index === -1) {
      throw new DBNotFound();
    }

    this.db.favs[entity].push(id);

    id;
  }

  addTrack(id: string) {
    this.addToFavorite(id, Entites.tracks);
  }

  addArtist(id: string) {
    this.addToFavorite(id, Entites.artists);
  }

  addAlbum(id: string) {
    this.addToFavorite(id, Entites.albums);
  }

  private removeFromFavorite(id: string, entity: Entites) {
    const include = this.db.favs[entity].includes(id);

    if (!include) {
      throw new DBNotFound();
    }

    this.db.favs[entity] = this.db.favs[entity].filter(
      (storedId) => storedId !== id,
    );
  }

  removeTrack(id: string) {
    this.removeFromFavorite(id, Entites.tracks);
  }

  removeArtist(id: string) {
    this.removeFromFavorite(id, Entites.artists);
  }

  removeAlbum(id: string) {
    this.removeFromFavorite(id, Entites.albums);
  }
}
