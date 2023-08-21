import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('track-fav')
export class TrackFav {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  trackId: string | null;

  @OneToOne(() => TrackEntity, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  track: TrackEntity;
}
