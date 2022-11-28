import React from "react";

import {
  CanExecuteCreatePortfolio,
  CheckPermission,
  CreatePortfolio,
  DomainError,
  left,
  Permission,
  PermissionOperation,
  Portfolio,
  PromiseEither,
  UsecaseWrapper,
} from "../../../domain";
import { Home } from "../../../presentation";
import {
  useAppDispatch,
  useAppSelector,
  portfoliosSelector,
  createPortfolio,
} from "../../store";

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

export function MakeHomeScreen() {
  const dispatch = useAppDispatch();

  const portfolios = useAppSelector(portfoliosSelector);

  const baseRequest = React.useMemo(() => {
    const canExecuteCreatePortfolio = new CanExecuteCreatePortfolio(
      portfolios.length,
      [
        Permission.create<Permission.CreatePortfolioMetadata>({
          action: "create_portfolio",
          operation: PermissionOperation.CREATE,
          resource: "portfolios",
          metadata: { count: 3 },
        }).value as Permission<Permission.CreatePortfolioMetadata>,
      ]
    );
    const checkPermission = new CheckPermission(canExecuteCreatePortfolio);
    const usecaseWrapped = new UsecaseWrapper(
      new CreatePortfolioDispatchAdapter(dispatch)
    );

    checkPermission.setNext(usecaseWrapped);

    return checkPermission;
  }, [dispatch, portfolios.length]);

  return <Home baseRequest={baseRequest} portfolios={portfolios} />;
}
