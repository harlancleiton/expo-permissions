import { configureStore } from "@reduxjs/toolkit";

import { portfoliosSlice } from "./features";
import { permissionsSlice } from "./features/permissions";

export const store = configureStore({
  reducer: {
    portfolios: portfoliosSlice.reducer,
    permissions: permissionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
