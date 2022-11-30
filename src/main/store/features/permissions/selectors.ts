import { createSelector } from "@reduxjs/toolkit";

import { Permission } from "../../../../domain";
import { RootState } from "../../store";

export const selfPermissionsSelector = (state: RootState) => {
  return state.permissions;
};

export const permissionsInJSONSelector = createSelector(
  selfPermissionsSelector,
  (permissions) => {
    return permissions.permissions;
  }
);

export const permissionsSelector = createSelector(
  permissionsInJSONSelector,
  (portfoliosInJSON) => {
    return portfoliosInJSON
      .map(Permission.fromJSON)
      .filter((either) => either.isRight())
      .map((permission) => permission.value as Permission);
  }
);
