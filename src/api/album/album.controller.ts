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
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';
import { DBNotFound } from '../../common/errors';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
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
        throw new NotFoundException();
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
        throw new NotFoundException();
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
        throw new NotFoundException();
      }
    }
  }
}
