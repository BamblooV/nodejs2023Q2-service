import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from '../interface/track.interface';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => ArtistEntity, (artist) => artist.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: ArtistEntity;

  artistId: string;

  @OneToOne(() => AlbumEntity, (album) => album.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: AlbumEntity;

  albumId: string;

  @Column()
  duration: number;
}
