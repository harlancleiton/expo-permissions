export class DomainError extends Error {
  constructor(message: string, public code: string = 'UNEXPECTED_ERROR') {
    super(message);
    this.name = this.constructor.name;
    Object.freeze(this);
  }
}
