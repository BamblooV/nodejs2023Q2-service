export class DbNotFoundError extends Error {
  constructor(message: string = '') {
    super(message);
  }
}
