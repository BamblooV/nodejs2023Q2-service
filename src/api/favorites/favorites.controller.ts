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
import {
  AlbumNotFoundError,
  ArtistNotFoundError,
  TrackNotFoundError,
} from '../../common/errors';
import { LoggingService } from '../../common/logger/LoggingService ';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly logger: LoggingService,
  ) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    try {
      await this.favoritesService.addTrack(trackId);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof TrackNotFoundError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favoritesService.removeTrack(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof TrackNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    try {
      await this.favoritesService.addAlbum(albumId);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof AlbumNotFoundError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favoritesService.removeAlbum(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof AlbumNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    try {
      await this.favoritesService.addArtist(artistId);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof ArtistNotFoundError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favoritesService.removeArtist(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof ArtistNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
