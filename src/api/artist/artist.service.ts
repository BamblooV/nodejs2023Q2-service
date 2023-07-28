import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { DBNotFound } from '../../common/errors';
import { DbService } from '../../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}
  create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const artist = Object.assign({ id }, createArtistDto);
    this.db.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const atrist = this.db.artists.find((atrist) => atrist.id === id);

    if (!atrist) {
      throw new DBNotFound();
    }

    return atrist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    Object.assign(artist, updateArtistDto);

    return artist;
  }

  remove(id: string) {
    const atrists = this.findOne(id);

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.db.artists = this.db.artists.filter((a) => a.id !== atrists.id);
  }
}
