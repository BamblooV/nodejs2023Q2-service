import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';
import { IsNullable } from '../../../common/utils/is-nullabel.decorator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNullable()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
  @IsNullable()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  albumId: string | null;
  @IsInt()
  duration: number;
}
