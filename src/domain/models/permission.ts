import { v4 as uuid } from "uuid";

import { DomainError } from "../errors";
import { Either, left, right } from "./either";

export class Permission<M extends Permission.Metadata = Permission.Metadata> {
  public static create<M extends Permission.Metadata>(
    props: Permission.CreateProps<M>
  ): Either<DomainError, Permission<M>> {
    const { id, action, operation, resource, metadata } = props;
    const slug = `${resource}.${action}`;

    // TODO verificar se operation é um enum válido

    // TODO criar erro específico
    if (!action) return left(new DomainError("action is required"));

    // TODO criar erro específico
    if (!resource) return left(new DomainError("resource is required"));

    // TODO criar erro específico
    if (!operation) return left(new DomainError("operation is required"));

    return right(
      new Permission({
        action,
        id: id || uuid(),
        operation,
        resource,
        slug,
        metadata,
      })
    );
  }

  private constructor(props: Permission.Props<M>) {
    const { action, id, operation, resource, slug, metadata } = props;

    this.id = id;
    this.action = action;
    this.operation = operation;
    this.resource = resource;
    this.slug = slug;
    this.metadata = metadata;
  }

  public readonly id: string;
  public readonly action: string;
  public readonly operation: PermissionOperation;
  public readonly resource: string;
  public readonly slug: string;
  public readonly metadata?: M;
}

export enum PermissionOperation {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export namespace Permission {
  export type Props<M extends Metadata> = {
    id: string;
    action: string; // create_portfolio
    operation: PermissionOperation; // PermissionOperation.CREATE
    resource: string; // portfolios
    slug: string; // portfolios.create_portfolio
    metadata?: M;
  };

  export type CreateProps<M extends Metadata> = {
    id?: string;
    action: string;
    operation: PermissionOperation;
    resource: string;
    metadata: M;
  };

  export type JSON = {
    id: string;
    name: string;
    description: string;
  };

  export type Metadata =
    | CreatePortfolioMetadata
    | CreateConnectionMetadata
    | undefined;

  export type CreatePortfolioMetadata = {
    count: number;
  };

  export type CreateConnectionMetadata = {
    partners: string[];
  };
}
