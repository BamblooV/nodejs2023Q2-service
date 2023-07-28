import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';
import DBNotFound from '../common/errors/DBNotFound';
import ForbiddenOperation from '../common/errors/ForbiddenOperations';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException();
      }
      if (error instanceof ForbiddenOperation) {
        throw new ForbiddenException();
      }
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException();
      }
      if (error instanceof ForbiddenOperation) {
        throw new ForbiddenException();
      }
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException();
      }
      if (error instanceof ForbiddenOperation) {
        throw new ForbiddenException();
      }
    }
  }
}
