import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { DBNotFound } from '../../common/errors';
import { DBEntities, DBService } from '../../db/db.service';

@Injectable()
export class TrackService {
  constructor(private db: DBService) {}
  create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const { albumId, artistId } = createTrackDto;

    this.db.isEntityExist(albumId, DBEntities.albums);
    this.db.isEntityExist(artistId, DBEntities.artists);

    const track = Object.assign({ id }, createTrackDto);
    this.db.tracks.push(track);

    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new DBNotFound(DBEntities.tracks);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    const { albumId, artistId } = updateTrackDto;

    this.db.isEntityExist(albumId, DBEntities.albums);
    this.db.isEntityExist(artistId, DBEntities.artists);

    Object.assign(track, updateTrackDto);

    return track;
  }

  remove(id: string) {
    this.findOne(id);

    this.db.favs.tracks = this.db.favs.tracks.filter(
      (storedId) => storedId !== id,
    );

    this.db.tracks = this.db.tracks.filter((u) => u.id !== id);
  }
}
