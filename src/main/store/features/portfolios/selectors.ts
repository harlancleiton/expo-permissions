import { createSelector } from "@reduxjs/toolkit";

import { Portfolio } from "../../../../domain";
import { RootState } from "../../store";

export const selfPortfoliosSelector = (state: RootState) => {
  console.log("selfPortfoliosSelector");
  return state.portfolios;
};

export const portfoliosInJSONSelector = createSelector(
  selfPortfoliosSelector,
  (portfolios) => {
    console.log("portfoliosInJSONSelector");
    return portfolios.portfolios;
  }
);

export const portfoliosSelector = createSelector(
  portfoliosInJSONSelector,
  (portfoliosInJSON) => {
    console.log("portfoliosSelector");
    return portfoliosInJSON
      .map((innerPortfolioInJSON) => Portfolio.fromJSON(innerPortfolioInJSON))
      .filter((either) => either.isRight())
      .map((portfolio) => portfolio.value as Portfolio);
  }
);
