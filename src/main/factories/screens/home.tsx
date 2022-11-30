import React from "react";

import { Home } from "../../../presentation";
import { CanExecuteProvider } from "../../../presentation/hooks";
import {
  useAppDispatch,
  useAppSelector,
  portfoliosSelector,
  permissionsSelector,
} from "../../store";
import {
  makeCanExecuteCreatePortfolio,
  makeCreatePortfolio,
} from "../usecases";

export function MakeHomeScreen() {
  const dispatch = useAppDispatch();

  const portfolios = useAppSelector(portfoliosSelector);
  const permissions = useAppSelector(permissionsSelector);

  const createPortfolio = React.useMemo(() => {
    return makeCreatePortfolio(portfolios.length, permissions, dispatch);
  }, [dispatch, permissions, portfolios.length]);

  const canExecuteCreatePortfolio = React.useMemo(() => {
    return makeCanExecuteCreatePortfolio(portfolios.length, permissions);
  }, [permissions, portfolios.length]);

  return (
    <CanExecuteProvider canExecute={canExecuteCreatePortfolio}>
      <Home createPortfolio={createPortfolio} portfolios={portfolios} />
    </CanExecuteProvider>
  );
}
