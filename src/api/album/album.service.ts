import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumNotFoundError } from '../../common/errors';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = this.albumRepository.create(createAlbumDto);

    return await this.albumRepository.save(album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
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

    await this.albumRepository.update(id, updateAlbumDto);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.albumRepository.delete(id);
  }
}
