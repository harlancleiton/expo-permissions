import { PromiseEither, Portfolio } from "../models";

export interface CreatePortfolio {
  execute(
    props: CreatePortfolio.Params
  ): PromiseEither<Portfolio.Errors, Portfolio>;
}

export namespace CreatePortfolio {
  export type Params = {
    title: string;
  };
}
