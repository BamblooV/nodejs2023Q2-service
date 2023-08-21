import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('album-fav')
export class AlbumFav {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  albumId: string | null;

  @OneToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  album: AlbumEntity;
}
