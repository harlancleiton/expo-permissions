import { createSlice } from "@reduxjs/toolkit";
import { DomainError } from "../../../../domain/errors";

import { createPortfolio } from "./thunks";
import { PortfolioState } from "./types";

const initialState: PortfolioState = {
  portfolios: [],
  creation: {
    status: "idle",
    error: null,
    value: null,
  },
};

export const portfoliosSlice = createSlice({
  initialState,
  name: "portfolios",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPortfolio.pending, (state) => {
      state.creation.status = "pending";
      state.creation.value = null;
      state.creation.error = null;
    }),
      builder.addCase(createPortfolio.fulfilled, (state, action) => {
        state.creation.status = "succeeded";
        state.creation.value = action.payload;
        state.portfolios.push(action.payload);
      });
    builder.addCase(createPortfolio.rejected, (state, action) => {
      state.creation.status = "failed";
      state.creation.error = action.payload as DomainError;
    });
  },
});
