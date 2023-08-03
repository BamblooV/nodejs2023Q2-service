import { DbNotFoundError } from './DbNotFoundError';

export class ArtistNotFoundError extends DbNotFoundError {
  constructor(id: string) {
    super(`Failed to find artist with id: ${id}`);
  }
}
