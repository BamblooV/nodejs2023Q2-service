import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { IsNullable } from '../../common/utils/is-nullabel.decorator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNullable()
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
  @IsNullable()
  @IsString()
  @IsNotEmpty()
  albumId: string | null;
  @IsInt()
  duration: number;
}
