import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { IsNullable } from '../../common/utils/is-nullabel.decorator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsNullable()
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
