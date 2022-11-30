import { configureStore } from "@reduxjs/toolkit";

import { permissionsSlice, portfoliosSlice } from "./features";

export const store = configureStore({
  reducer: {
    portfolios: portfoliosSlice.reducer,
    permissions: permissionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
