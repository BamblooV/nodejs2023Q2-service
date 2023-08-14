export class ForbiddenOperationError extends Error {
  constructor(message: string = 'Forbidden operation') {
    super(message);
  }
}
