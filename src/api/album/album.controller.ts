import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';
import { DBNotFound } from '../../common/errors';
import { DBEntities } from '../../db/db.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return this.albumService.create(createAlbumDto);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new UnprocessableEntityException(error.message);
      }
    }
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.albumService.findOne(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return this.albumService.update(id, updateAlbumDto);
    } catch (error) {
      if (error instanceof DBNotFound) {
        if (error.message.endsWith(DBEntities.albums)) {
          throw new NotFoundException(error.message);
        }
        throw new UnprocessableEntityException(error.message);
      }
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.albumService.remove(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
