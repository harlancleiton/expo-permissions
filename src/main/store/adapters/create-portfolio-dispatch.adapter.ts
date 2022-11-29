import {
  CreatePortfolio,
  PermissionOperation,
  PromiseEither,
  Portfolio,
  DomainError,
  left,
} from "../../../domain";
import { createPortfolio } from "../features";
import { useAppDispatch } from "../hooks";

export class CreatePortfolioDispatchAdapter implements CreatePortfolio {
  constructor(private readonly dispatch: ReturnType<typeof useAppDispatch>) {}

  public readonly action = "create_portfolio";
  public readonly resource = "portfolios";
  public readonly operation = PermissionOperation.CREATE;

  public async execute(
    params: CreatePortfolio.Params
  ): PromiseEither<Portfolio.Errors, Portfolio> {
    try {
      const portfolioInJSON = await this.dispatch(
        createPortfolio(params)
      ).unwrap();
      return Portfolio.fromJSON(portfolioInJSON);
    } catch (err) {
      if (err instanceof DomainError) {
        return left(err);
      }

      return left(new DomainError("Erro desconhecido"));
    }
  }
}
