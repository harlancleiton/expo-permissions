import { DomainError } from "./domain.error";

export enum SuggestiveActionError {
  InvalidTitle = "SUGGESTIVE_ACTION_INVALID_TITLE",
  InvalidMessage = "SUGGESTIVE_ACTION_INVALID_MESSAGE",
}

export class SuggestiveActionInvalidTitleError extends DomainError {
  constructor() {
    super("Title must be informed", SuggestiveActionError.InvalidTitle);
  }
}

export class SuggestiveActionInvalidMessageError extends DomainError {
  constructor() {
    super("Message must be informed", SuggestiveActionError.InvalidMessage);
  }
}
