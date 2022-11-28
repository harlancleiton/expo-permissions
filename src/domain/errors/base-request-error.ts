import { DomainError } from "./domain.error";

export class BaseRequestError extends DomainError {
  constructor(
    message: string,
    public readonly handler: string,
    code = "UNEXPECTED_ERROR"
  ) {
    super(message, code);
    this.name = this.constructor.name;
    Object.freeze(this);
  }
}
