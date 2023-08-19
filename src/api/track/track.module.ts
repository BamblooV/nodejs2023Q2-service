import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), LoggerModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
