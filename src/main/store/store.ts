import { configureStore } from "@reduxjs/toolkit";
import { portfoliosSlice } from "./portfolios/slice";

export const store = configureStore({
  reducer: {
    portfolios: portfoliosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
