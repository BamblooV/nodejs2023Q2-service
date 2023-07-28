import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import configuration from './config/configuration';
import { TrackModule } from './api/track/track.module';
import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    DbModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
