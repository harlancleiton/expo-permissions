import React from "react";

import { Home } from "../../../presentation";
import {
  useAppDispatch,
  useAppSelector,
  portfoliosSelector,
} from "../../store";
import { makeCreatePortfolio } from "../usecases";

export function MakeHomeScreen() {
  const dispatch = useAppDispatch();

  const portfolios = useAppSelector(portfoliosSelector);

  const createPortfolio = React.useMemo(() => {
    return makeCreatePortfolio(portfolios.length, dispatch);
  }, [dispatch, portfolios.length]);

  return <Home createPortfolio={createPortfolio} portfolios={portfolios} />;
}
