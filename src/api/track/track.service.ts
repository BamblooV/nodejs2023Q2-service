import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackNotFoundError } from '../../common/errors';
import { TrackEntity } from './entities/track.entity';
import { DbService } from '../../db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track = this.db.trackRepository.create(createTrackDto);

    return await this.db.trackRepository.save(track);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.db.trackRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.db.trackRepository.findOne({ where: { id } });

    if (track === null) {
      throw new TrackNotFoundError(id);
    }

    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    await this.findOne(id);

    this.db.trackRepository.update(id, updateTrackDto);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.trackRepository.delete(id);
  }
}
