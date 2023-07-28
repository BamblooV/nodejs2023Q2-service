import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from '../db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { DBNotFound } from '../common/errors/';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}
  create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
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
      throw new DBNotFound();
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    Object.assign(track, updateTrackDto);

    return track;
  }

  remove(id: string) {
    const track = this.findOne(id);

    this.db.tracks = this.db.tracks.filter((u) => u.id !== track.id);
  }
}
