import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { TrackNotFoundError } from '../../common/errors';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.trackService.findOne(id);
    } catch (error) {
      if (error instanceof TrackNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrackDto);
    } catch (error) {
      if (error instanceof TrackNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.trackService.remove(id);
    } catch (error) {
      if (error instanceof TrackNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
