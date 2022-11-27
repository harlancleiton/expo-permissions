import { DomainError } from "./domain.error";

export enum CanExecuteErrors {
  MaxNumberOfPortfoliosReached = "MAX_NUMBER_OF_PORTFOLIOS_REACHED",
  PartnerIsNotAllowed = "PARTNER_IS_NOT_ALLOWED",
}

export class MaxNumberOfPortfoliosReachedError extends DomainError {
  constructor() {
    super(
      "Max number of portfolios reached",
      CanExecuteErrors.MaxNumberOfPortfoliosReached
    );
  }
}

export class PartnerIsNotAllowedError extends DomainError {
  constructor() {
    super(
      "Partner is not allowed to create portfolios",
      CanExecuteErrors.PartnerIsNotAllowed
    );
  }
}
