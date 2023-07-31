import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Artist } from '../interface/artist.interface';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
