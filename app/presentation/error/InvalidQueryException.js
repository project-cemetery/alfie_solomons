export class InvalidQueryException extends Error {
  constructor(query) {
    super(`Invalid query`);

    this.query = query;
  }
}
