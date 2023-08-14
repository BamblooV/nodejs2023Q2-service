import { DbNotFoundError } from './DbNotFoundError';

export class AlbumNotFoundError extends DbNotFoundError {
  constructor(id: string) {
    super(`Failed to find album with id: ${id}`);
  }
}
