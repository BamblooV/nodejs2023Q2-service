import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { DBNotFound } from '../common/errors';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const album = Object.assign({ id }, createAlbumDto);
    this.db.albums.push(album);
    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new DBNotFound();
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    Object.assign(album, updateAlbumDto);

    return album;
  }

  remove(id: string) {
    this.findOne(id);

    this.db.tracks.forEach((track) => {
      if (track.albumId == id) {
        track.albumId = null;
      }
    });

    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }
}
