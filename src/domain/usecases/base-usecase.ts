import { PermissionOperation } from "../models";

export interface BaseUsecase<ReturnType> {
  action: Readonly<string>;
  resource: Readonly<string>;
  operation: Readonly<PermissionOperation>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(...args: any[]): ReturnType;
}
