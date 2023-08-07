import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistNotFoundError } from '../../common/errors';
import { ArtistEntity } from './entities/artist.entity';
import { DbService } from '../../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.db.artistRepository.create(createArtistDto);

    return await this.db.artistRepository.save(artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.db.artistRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.db.artistRepository.findOne({
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

    await this.db.artistRepository.update(id, updateArtistDto);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.artistRepository.delete(id);
  }
}
