import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../interface/album.interface';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string | null;
}
