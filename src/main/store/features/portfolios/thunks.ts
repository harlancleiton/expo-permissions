import { createAsyncThunk } from "@reduxjs/toolkit";

import { Portfolio, MockedCreatePortfolio } from "../../../../domain";
import { PayloadCreatePortfolio } from "./types";

export const createPortfolio = createAsyncThunk<
  Portfolio.JSON,
  PayloadCreatePortfolio,
  { rejectValue: Portfolio.Errors }
>("portfolios/createPortfolio", async (portfolioCreateProps) => {
  const _createPortfolio = new MockedCreatePortfolio();
  const portfolioOrError = await _createPortfolio.execute(portfolioCreateProps);

  if (portfolioOrError.isLeft()) {
    throw portfolioOrError.value;
  }

  return portfolioOrError.value.toJSON();
});
