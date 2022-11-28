import { v4 as uuid } from "uuid";

import { SuggestiveActionType } from "../enums";
import {
  SuggestiveActionInvalidMessageError,
  SuggestiveActionInvalidTitleError,
} from "../errors";
import { Either, left, right } from "./either";

export class SuggestiveAction {
  public static create(
    props: SuggestiveAction.CreateProps
  ): Either<SuggestiveAction.Errors, SuggestiveAction> {
    const { id = uuid(), title, message, action } = props;

    if (!title) {
      return left(new SuggestiveActionInvalidTitleError());
    }

    if (!message) {
      return left(new SuggestiveActionInvalidMessageError());
    }

    return right(new SuggestiveAction({ id, title, message, action }));
  }

  private constructor(props: SuggestiveAction.Props) {
    this.id = props.id;
    this.title = props.title;
    this.message = props.message;
    this.action = props.action;
  }

  public static fromJSON(
    json: SuggestiveAction.JSON
  ): Either<SuggestiveAction.Errors, SuggestiveAction> {
    return SuggestiveAction.create({
      id: json.id,
      title: json.title,
      message: json.message,
      action: json.action,
    });
  }

  public toJSON(): SuggestiveAction.JSON {
    return {
      id: this.id,
      title: this.title,
      message: this.message,
      action: this.action,
    };
  }

  public readonly id: string;
  public readonly title: string;
  public readonly message: string;
  public readonly action: SuggestiveActionType;
}

export namespace SuggestiveAction {
  export type Errors =
    | SuggestiveActionInvalidTitleError
    | SuggestiveActionInvalidMessageError;

  export type Props = {
    id: string;
    title: string;
    message: string;
    action: SuggestiveActionType;
  };

  export type CreateProps = {
    id?: string;
    title: string;
    message: string;
    action: SuggestiveActionType;
  };

  export type JSON = {
    id: string;
    title: string;
    message: string;
    action: SuggestiveActionType;
  };
}
