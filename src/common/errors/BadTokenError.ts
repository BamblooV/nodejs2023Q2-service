export class BadTokenError extends Error {
  constructor() {
    super('Bad token');
  }
}
