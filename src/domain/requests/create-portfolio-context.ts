import { PermissionOperation } from "../models";
import { CreatePortfolio } from "../usecases";
import { RequestContext } from "./request-context";

export class CreatePortfolioContext extends RequestContext<CreatePortfolio.Params> {
  public static create(data: CreatePortfolio.Params): CreatePortfolioContext {
    return new CreatePortfolioContext(
      "create_portfolio",
      "portfolios",
      PermissionOperation.CREATE,
      data
    );
  }
}
