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
import {
  ForbiddenOperationError,
  UserNotFoundError,
} from '../../common/errors';
import { UserEntity } from './entities/user.entity';
import { LoggingService } from '../../common/logger/LoggingService ';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggingService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserEntity> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ForbiddenOperationError) {
        throw new ForbiddenException(error.message);
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.userService.remove(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
