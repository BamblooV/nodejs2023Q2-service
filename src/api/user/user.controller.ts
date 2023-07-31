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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';
import { DBNotFound, ForbiddenOperation } from '../../common/errors';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserEntity {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserEntity {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof DBNotFound) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ForbiddenOperation) {
        throw new ForbiddenException(error.message);
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
        throw new NotFoundException(error.message);
      }
    }
  }
}
