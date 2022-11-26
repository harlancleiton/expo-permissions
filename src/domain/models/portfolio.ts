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
    this.#id = props.id;
    this.#title = props.title;
    this.#createdAt = props.createdAt;
  }

  public get id(): string {
    return this.#id;
  }

  public get title(): string {
    return this.#title;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  readonly #id: string;
  readonly #title: string;
  readonly #createdAt: Date;
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
}
