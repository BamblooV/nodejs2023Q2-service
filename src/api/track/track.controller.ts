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
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { DBNotFound } from '../../common/errors';
import { DBEntities } from '../../db/db.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return this.trackService.create(createTrackDto);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new UnprocessableEntityException(error.message);
      }
    }
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.trackService.findOne(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.trackService.update(id, updateTrackDto);
    } catch (error) {
      if (error instanceof DBNotFound) {
        if (error.message.endsWith(DBEntities.tracks)) {
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
      return this.trackService.remove(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
