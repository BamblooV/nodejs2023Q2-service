import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumNotFoundError } from '../../common/errors';
import { AlbumEntity } from './entities/album.entity';

import { DbService } from '../../db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = this.db.albumRepository.create(createAlbumDto);

    return await this.db.albumRepository.save(album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.db.albumRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.db.albumRepository.findOne({
      where: { id },
    });

    if (album === null) {
      throw new AlbumNotFoundError(id);
    }

    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    await this.findOne(id);

    await this.db.albumRepository.update(id, updateAlbumDto);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.albumRepository.delete(id);
  }
}
