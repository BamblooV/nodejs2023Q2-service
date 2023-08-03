import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackNotFoundError } from '../../common/errors';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track = this.trackRepository.create(createTrackDto);

    return await this.trackRepository.save(track);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({ where: { id } });

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

    this.trackRepository.update(id, updateTrackDto);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.trackRepository.delete(id);
  }
}
