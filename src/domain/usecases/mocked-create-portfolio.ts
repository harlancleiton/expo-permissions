import { Portfolio, PromiseEither } from "../models";
import { CreatePortfolio } from "./create-portfolio";

export class MockedCreatePortfolio implements CreatePortfolio {
  public execute({
    title,
  }: CreatePortfolio.Params): PromiseEither<Portfolio.Errors, Portfolio> {
    const response = Portfolio.create({ title });
    console.log("🚀 ~ MockedCreatePortfolio ~ response", response);
    return Promise.resolve(response);
  }
}
