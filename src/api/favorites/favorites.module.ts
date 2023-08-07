import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumFav, TrackFav, ArtistFav } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumFav, TrackFav, ArtistFav])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
