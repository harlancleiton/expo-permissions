import { PermissionOperation, Portfolio } from "../models";
import { CreatePortfolio } from "./create-portfolio";

export class MockedCreatePortfolio implements CreatePortfolio {
  public readonly action = "create";
  public readonly resource = "portfolios";
  public readonly operation = PermissionOperation.CREATE;

  public execute({ title }: CreatePortfolio.Params): CreatePortfolio.Output {
    const response = Portfolio.create({ title });
    console.log("🚀 ~ MockedCreatePortfolio ~ response", response);
    return Promise.resolve(response);
  }
}
