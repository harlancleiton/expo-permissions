import React from "react";

import {
  CreatePortfolio,
  DomainError,
  left,
  Portfolio,
  PromiseEither,
} from "../../../domain";
import { Home } from "../../../presentation";
import {
  useAppDispatch,
  useAppSelector,
  portfoliosSelector,
  createPortfolio,
} from "../../store";

export class DispatchCreatePortfolioAdapter implements CreatePortfolio {
  constructor(private readonly dispatch: ReturnType<typeof useAppDispatch>) {}

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
  console.log("🚀 ~ MakeHomeScreen ~ portfolios", portfolios);

  const _createPortfolio = React.useMemo(() => {
    return new DispatchCreatePortfolioAdapter(dispatch);
  }, [dispatch]);

  return <Home createPortfolio={_createPortfolio} portfolios={portfolios} />;
}
