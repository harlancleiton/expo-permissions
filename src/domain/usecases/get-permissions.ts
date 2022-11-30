import { DomainError } from "../errors";
import { Permission, PermissionOperation, PromiseEither } from "../models";
import { BaseUsecase } from "./base-usecase";

export interface GetPermissions extends BaseUsecase {
  action: "list_permissions";
  resource: "permissions";
  operation: PermissionOperation.READ;

  execute(): PromiseEither<DomainError, Permission[]>;
}
