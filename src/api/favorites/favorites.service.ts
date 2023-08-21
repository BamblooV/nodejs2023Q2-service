import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import {
  AlbumNotFoundError,
  ArtistNotFoundError,
  TrackNotFoundError,
} from '../../common/errors';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  async findAll() {
    const tracks = await this.db.trackfavRepository.find({
      relations: { track: true },
    });
    const albums = await this.db.albumfavRepository.find({
      relations: { album: true },
    });
    const artists = await this.db.artistfavRepository.find({
      relations: { artist: true },
    });
    return {
      tracks: tracks.map((trackFav) => trackFav.track),
      albums: albums.map((albumFav) => albumFav.album),
      artists: artists.map((artistFav) => artistFav.artist),
    };
  }

  async addTrack(id: string) {
    const track = await this.db.trackRepository.findOne({ where: { id } });
    if (track === null) {
      throw new TrackNotFoundError(id);
    }
    const favTrack = this.db.trackfavRepository.create({ trackId: track.id });
    await this.db.trackfavRepository.save(favTrack);
  }

  async addArtist(id: string) {
    const artist = await this.db.artistRepository.findOne({ where: { id } });
    if (artist === null) {
      throw new ArtistNotFoundError(id);
    }
    const favArtist = this.db.artistfavRepository.create({
      artistId: artist.id,
    });
    await this.db.artistfavRepository.save(favArtist);
  }

  async addAlbum(id: string) {
    const album = await this.db.albumRepository.findOne({ where: { id } });
    if (album === null) {
      throw new AlbumNotFoundError(id);
    }
    const favAlbum = this.db.albumfavRepository.create({ albumId: album.id });
    await this.db.albumfavRepository.save(favAlbum);
  }

  async removeTrack(id: string) {
    const favTrack = await this.db.trackfavRepository.findOne({
      where: { trackId: id },
    });
    if (favTrack === null) {
      throw new TrackNotFoundError(id);
    }

    await this.db.trackfavRepository.delete(favTrack);
  }

  async removeArtist(id: string) {
    const favArtists = await this.db.artistfavRepository.findOne({
      where: { artistId: id },
    });
    if (favArtists === null) {
      throw new ArtistNotFoundError(id);
    }

    await this.db.artistfavRepository.delete(favArtists);
  }

  async removeAlbum(id: string) {
    const favAlbum = await this.db.albumfavRepository.findOne({
      where: { albumId: id },
    });
    if (favAlbum === null) {
      throw new AlbumNotFoundError(id);
    }

    await this.db.albumfavRepository.delete(favAlbum);
  }
}
