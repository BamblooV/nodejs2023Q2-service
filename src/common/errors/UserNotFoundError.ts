import { DbNotFoundError } from './DbNotFoundError';

export class UserNotFoundError extends DbNotFoundError {
  constructor(id: string) {
    super(`Failed to find user with id: ${id}`);
  }
}
