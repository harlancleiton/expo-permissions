import { PermissionOperation, Portfolio } from "../models";
import { CreatePortfolio } from "./create-portfolio";

export class MockedCreatePortfolio implements CreatePortfolio {
  public readonly action = "create_portfolio";
  public readonly resource = "portfolios";
  public readonly operation = PermissionOperation.CREATE;

  public execute({ title }: CreatePortfolio.Params): CreatePortfolio.Output {
    const response = Portfolio.create({ title });

    return Promise.resolve(response);
  }
}
