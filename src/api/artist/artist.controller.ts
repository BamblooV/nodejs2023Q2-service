import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';
import { ArtistNotFoundError } from '../../common/errors';
import { LoggingService } from '../../common/logger/LoggingService ';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly logger: LoggingService,
  ) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.artistService.findOne(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof ArtistNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return await this.artistService.update(id, updateArtistDto);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof ArtistNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.artistService.remove(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof ArtistNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
