import {
  MaxNumberOfPortfoliosReachedError,
  PartnerIsNotAllowedError,
} from "../errors/permission";
import { PromiseEither, Portfolio, PermissionOperation } from "../models";
import { BaseUsecase } from "./base-usecase";

export interface CreatePortfolio
  extends BaseUsecase<CreatePortfolio.Errors, Portfolio> {
  action: "create_portfolio";
  resource: "portfolios";
  operation: PermissionOperation.CREATE;

  execute(props: CreatePortfolio.Params): CreatePortfolio.Output;
}

export namespace CreatePortfolio {
  export type Params = {
    title: string;
  };

  export type Output = PromiseEither<CreatePortfolio.Errors, Portfolio>;

  export type Errors =
    | Portfolio.Errors
    | MaxNumberOfPortfoliosReachedError
    | PartnerIsNotAllowedError;
}
