export class DBNotFound extends Error {
  constructor(entityType: string = '') {
    super('Failed to find db entity ' + entityType);
  }
}
