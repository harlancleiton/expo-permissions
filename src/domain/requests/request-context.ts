import { v4 as uuid } from "uuid";

import { PermissionOperation } from "../models";

export class RequestContext<DataType = undefined> {
  #id: string;
  #action: string;
  #resource: string;
  #operation: PermissionOperation;
  #data: DataType;

  constructor(
    action: string,
    resource: string,
    operation: PermissionOperation,
    data: DataType
  ) {
    this.#id = uuid();
    this.#action = action;
    this.#resource = resource;
    this.#operation = operation;
    this.#data = data;
  }

  public toJSON(): RequestContext.JSON<DataType> {
    return {
      id: this.#id,
      action: this.#action,
      resource: this.#resource,
      operation: this.#operation,
      data: this.#data,
    };
  }

  public get action(): string {
    return this.#action;
  }

  public get resource(): string {
    return this.#resource;
  }

  public get operation(): PermissionOperation {
    return this.#operation;
  }

  public get data(): DataType {
    return this.#data;
  }
}

export namespace RequestContext {
  export type JSON<DataType = undefined> = {
    id: string;
    action: string;
    resource: string;
    operation: PermissionOperation;
    data: DataType;
  };
}
