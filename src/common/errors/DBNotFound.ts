export default class DBNotFound extends Error {
  constructor(message: string = 'Failed to find db entity') {
    super(message);
  }
}
