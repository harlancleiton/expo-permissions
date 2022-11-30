import { createSlice } from "@reduxjs/toolkit";

import { DomainError } from "../../../../domain";
import { getPermissions } from "./thunks";
import { PermissionState } from "./types";

const initialState: PermissionState = {
  permissions: [],
  list: {
    status: "idle",
    error: null,
    value: [],
  },
};

export const permissionsSlice = createSlice({
  initialState,
  name: "permissions",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermissions.pending, (state) => {
      state.list.status = "pending";
      state.list.value = [];
      state.list.error = null;
    }),
      builder.addCase(getPermissions.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.value = action.payload;
        state.permissions = action.payload;
      });
    builder.addCase(getPermissions.rejected, (state, action) => {
      state.list.status = "failed";
      state.list.error = action.payload as DomainError;
    });
  },
});
