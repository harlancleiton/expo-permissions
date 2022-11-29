import { sleep, getRandomInt } from "../../utils";
import { PermissionOperation, Portfolio } from "../models";
import { CreatePortfolio } from "./create-portfolio";

export class MockedCreatePortfolio implements CreatePortfolio {
  public readonly action = "create_portfolio";
  public readonly resource = "portfolios";
  public readonly operation = PermissionOperation.CREATE;

  public async execute({
    title,
  }: CreatePortfolio.Params): CreatePortfolio.Output {
    const response = Portfolio.create({ title });

    await sleep(getRandomInt(1000, 5000));

    return response;
  }
}
