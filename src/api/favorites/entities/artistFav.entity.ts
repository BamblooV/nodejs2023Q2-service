import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('artist-fav')
export class ArtistFav {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => ArtistEntity, (artists) => artists.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string | null;
}
