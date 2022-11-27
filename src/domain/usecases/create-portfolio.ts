import {
  MaxNumberOfPortfoliosReachedError,
  PartnerIsNotAllowedError,
} from "../errors/permission";
import { PromiseEither, Portfolio } from "../models";

export interface CreatePortfolio {
  execute(
    props: CreatePortfolio.Params
  ): PromiseEither<CreatePortfolio.Errors, Portfolio>;
}

export namespace CreatePortfolio {
  export type Params = {
    title: string;
  };

  export type Errors =
    | Portfolio.Errors
    | MaxNumberOfPortfoliosReachedError
    | PartnerIsNotAllowedError;
}
