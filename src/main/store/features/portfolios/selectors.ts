import { createSelector } from "@reduxjs/toolkit";

import { Portfolio } from "../../../../domain";
import { RootState } from "../../store";

export const selfPortfoliosSelector = (state: RootState) => {
  return state.portfolios;
};

export const portfoliosInJSONSelector = createSelector(
  selfPortfoliosSelector,
  (portfolios) => {
    return portfolios.portfolios;
  }
);

export const portfoliosSelector = createSelector(
  portfoliosInJSONSelector,
  (portfoliosInJSON) => {
    return portfoliosInJSON
      .map(Portfolio.fromJSON)
      .filter((either) => either.isRight())
      .map((portfolio) => portfolio.value as Portfolio);
  }
);
