export class ForbiddenOperation extends Error {
  constructor(message: string = 'Forbidden operation') {
    super(message);
  }
}
