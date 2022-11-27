import { createSelector } from "@reduxjs/toolkit";
import { Portfolio } from "../../../../domain";
import { RootState } from "../../store";

export const selfPortfoliosSelector = (state: RootState) => {
  return state.portfolios;
};

export const portfoliosInJSONSelector = createSelector(
  selfPortfoliosSelector,
  (portfolios) => portfolios.portfolios
);

export const portfoliosSelector = createSelector(
  portfoliosInJSONSelector,
  (portfoliosInJSON) => {
    return portfoliosInJSON
      .map((innerPortfolioInJSON) => Portfolio.fromJSON(innerPortfolioInJSON))
      .filter((either) => either.isRight())
      .map((portfolio) => portfolio.value as Portfolio);
  }
);
