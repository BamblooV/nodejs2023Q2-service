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

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => AlbumEntity, (album) => album.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: AlbumEntity;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
