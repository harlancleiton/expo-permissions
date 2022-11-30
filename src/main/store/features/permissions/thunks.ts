import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  Portfolio,
  Permission,
  MockedGetPermissions,
} from "../../../../domain";

export const getPermissions = createAsyncThunk<
  Permission.JSON[],
  undefined,
  { rejectValue: Portfolio.Errors }
>("permissions/getPermissions", async () => {
  const _getPermissions = new MockedGetPermissions();
  const response = await _getPermissions.execute();

  if (response.isLeft()) {
    throw response.value;
  }

  return response.value.map((permission) => permission.toJSON());
});
