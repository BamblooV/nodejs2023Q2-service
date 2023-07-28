import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';
import { DBNotFound } from '../../common/errors';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string) {
    try {
      this.favoritesService.addTrack(trackId);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new UnprocessableEntityException();
      }
    }
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.removeTrack(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException();
      }
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string) {
    try {
      this.favoritesService.addAlbum(albumId);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new UnprocessableEntityException();
      }
    }
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.removeAlbum(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException();
      }
    }
  }

  @Post('artist/:id')
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    try {
      this.favoritesService.addArtist(artistId);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new UnprocessableEntityException();
      }
    }
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.removeArtist(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException();
      }
    }
  }
}
