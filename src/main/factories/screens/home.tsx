import React from "react";

import { Home } from "../../../presentation";
import { CanExecuteProvider } from "../../../presentation/hooks";
import {
  useAppDispatch,
  useAppSelector,
  portfoliosSelector,
} from "../../store";
import {
  makeCanExecuteCreatePortfolio,
  makeCreatePortfolio,
} from "../usecases";

export function MakeHomeScreen() {
  const dispatch = useAppDispatch();

  const portfolios = useAppSelector(portfoliosSelector);

  const createPortfolio = React.useMemo(() => {
    return makeCreatePortfolio(portfolios.length, dispatch);
  }, [dispatch, portfolios.length]);

  const canExecuteCreatePortfolio = React.useMemo(() => {
    return makeCanExecuteCreatePortfolio(portfolios.length);
  }, [portfolios.length]);

  return (
    <CanExecuteProvider canExecute={canExecuteCreatePortfolio}>
      <Home createPortfolio={createPortfolio} portfolios={portfolios} />
    </CanExecuteProvider>
  );
}
