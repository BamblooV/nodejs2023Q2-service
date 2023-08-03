import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistNotFoundError } from '../../common/errors';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.artistRepository.create(createArtistDto);

    return await this.artistRepository.save(artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (artist === null) {
      throw new ArtistNotFoundError(id);
    }

    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    await this.findOne(id);

    await this.artistRepository.update(id, updateArtistDto);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.artistRepository.delete(id);
  }
}
