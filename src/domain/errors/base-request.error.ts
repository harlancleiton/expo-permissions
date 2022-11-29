import { SuggestiveAction } from "../models";
import { DomainError } from "./domain.error";

export class BaseRequestError extends DomainError {
  constructor(
    message: string,
    suggestiveActions: SuggestiveAction[] = [],
    public readonly handler: string,
    code = "UNEXPECTED_ERROR"
  ) {
    super(message, suggestiveActions, code);
    this.name = this.constructor.name;
    Object.freeze(this);
  }
}
