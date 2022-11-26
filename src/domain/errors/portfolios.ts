import { DomainError } from "./domain.error";

export enum PortfolioError {
  InvalidTitle = "PORTFOLIO_INVALID_TITLE",
  CreatedAtCannotBeInFuture = "PORTFOLIO_CREATED_AT_CANNOT_BE_IN_FUTURE",
}

export class PortfolioInvalidTitleError extends DomainError {
  constructor() {
    super("Title must be informed", PortfolioError.InvalidTitle);
  }
}

export class PortfolioCreatedAtCannotBeInFutureError extends DomainError {
  constructor() {
    super("CreatedAt cannot be in future", PortfolioError.InvalidTitle);
  }
}
