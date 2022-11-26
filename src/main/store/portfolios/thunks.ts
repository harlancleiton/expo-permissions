import { createAsyncThunk } from "@reduxjs/toolkit";
import { Portfolio, MockedCreatePortfolio } from "../../../domain";
import { PayloadCreatePortfolio } from "./types";

export const createPortfolio = createAsyncThunk<
  Portfolio,
  PayloadCreatePortfolio,
  { rejectValue: Portfolio.Errors }
>("portfolios/createPortfolio", async (portfolioCreateProps) => {
  const _createPortfolio = new MockedCreatePortfolio();
  const response = await _createPortfolio.execute(portfolioCreateProps);

  if (response.isLeft()) {
    throw response.value;
  }

  return JSON.parse(JSON.stringify(response.value));
});
