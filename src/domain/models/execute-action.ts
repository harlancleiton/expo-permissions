import { DomainError } from "../errors";
import { Either, right } from "./either";
import { PermissionOperation } from "./permission";

export class ExecuteAction {
  public static create(
    props: ExecuteAction.CreateProps
  ): Either<ExecuteAction.Errors, ExecuteAction> {
    return right(new ExecuteAction(props));
  }

  public static fromJSON(
    json: ExecuteAction.JSON
  ): Either<ExecuteAction.Errors, ExecuteAction> {
    return ExecuteAction.create({
      action: json.action,
      resource: json.resource,
      operation: json.operation,
    });
  }

  public toJSON(): ExecuteAction.JSON {
    return {
      action: this.action,
      resource: this.resource,
      operation: this.operation,
    };
  }

  private constructor(props: ExecuteAction.Props) {
    this.action = props.action;
    this.resource = props.resource;
    this.operation = props.operation;
  }

  public readonly action: string; // create_portfolio
  public readonly resource: string; // portfolios
  public readonly operation: PermissionOperation; // PermissionOperation.CREATE
}

export namespace ExecuteAction {
  export type Errors = DomainError;

  export type Props = {
    action: string;
    resource: string;
    operation: PermissionOperation;
  };

  export type CreateProps = {
    action: string;
    resource: string;
    operation: PermissionOperation;
  };

  export type JSON = {
    action: string;
    resource: string;
    operation: PermissionOperation;
  };
}
