import { SuggestiveAction } from "../models";

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly suggestiveActions: SuggestiveAction[] = [],
    public readonly code: string = "UNEXPECTED_ERROR"
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.freeze(this);
  }
}
