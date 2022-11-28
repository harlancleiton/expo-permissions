import { DomainError } from "../errors";
import { PermissionOperation, PromiseEither } from "../models";

export interface BaseUsecase<
  LeftReturn extends DomainError = DomainError,
  RightReturn = any
> {
  action: Readonly<string>;
  resource: Readonly<string>;
  operation: Readonly<PermissionOperation>;

  execute(...args: any[]): PromiseEither<LeftReturn, RightReturn>;
}
