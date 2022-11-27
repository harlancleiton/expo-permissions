import { v4 as uuid } from "uuid";

import {
  PortfolioCreatedAtCannotBeInFutureError,
  PortfolioInvalidTitleError,
} from "../errors/portfolios";
import { Either, left, right } from "./either";

export class Portfolio {
  public static create(
    props: Portfolio.CreateProps
  ): Either<Portfolio.Errors, Portfolio> {
    if (!props.title) {
      return left(new PortfolioInvalidTitleError());
    }

    const { id = uuid(), title, createdAt = new Date() } = props;

    const createdAtInFuture = createdAt > new Date();
    if (createdAtInFuture) {
      return left(new PortfolioCreatedAtCannotBeInFutureError());
    }

    return right(new Portfolio({ id, title, createdAt }));
  }

  private constructor(props: Portfolio.Props) {
    this.id = props.id;
    this.title = props.title;
    this.createdAt = props.createdAt;
  }

  public static fromJSON(
    json: Portfolio.JSON
  ): Either<Portfolio.Errors, Portfolio> {
    return Portfolio.create({
      id: json.id,
      title: json.title,
      createdAt: new Date(json.createdAt),
    });
  }

  public toJSON(): Portfolio.JSON {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt.toISOString(),
    };
  }

  public readonly id: string;
  public readonly title: string;
  public readonly createdAt: Date;
}

export namespace Portfolio {
  export type Errors =
    | PortfolioInvalidTitleError
    | PortfolioCreatedAtCannotBeInFutureError;

  export type Props = {
    id: string;
    title: string;
    createdAt: Date;
  };

  export type CreateProps = {
    id?: string;
    title: string;
    createdAt?: Date;
  };

  export type JSON = {
    id: string;
    title: string;
    createdAt: string;
  };
}
