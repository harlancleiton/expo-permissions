import { Portfolio, PromiseEither } from "../models";
import { CreatePortfolio } from "./create-portfolio";

export class MockedCreatePortfolio implements CreatePortfolio {
  public execute({
    title,
  }: CreatePortfolio.Params): PromiseEither<Portfolio.Errors, Portfolio> {
    return Promise.resolve(Portfolio.create({ title }));
  }
}
