import { SuggestiveActionType } from "../enums";
import {
  Either,
  ExecuteAction,
  left,
  Permission,
  RecurrenceExecute,
  right,
  SuggestiveAction,
} from "../models";
import { CanExecute } from "./can-execute";

export class CanExecuteCreatePortfolio implements CanExecute {
  #totalPortfolios: number;
  #permissions: Permission<Permission.CreatePortfolioMetadata>[] = [];

  constructor(totalPortfolios: number, permissions: Permission[]) {
    this.#totalPortfolios = totalPortfolios;
    // TODO fix generics
    this.#permissions =
      permissions as Permission<Permission.CreatePortfolioMetadata>[];
  }

  public execute(
    context: ExecuteAction
  ): Either<RecurrenceExecute, RecurrenceExecute> {
    console.log("🚀 ~ CanExecuteCreatePortfolio ~ execute ~ context", context);

    const createPortfolioPermission = this.#permissions.find(
      (permission) => permission.action === context.action
    );

    const hasPermission = !!createPortfolioPermission;
    const hasMetadata = !!createPortfolioPermission?.metadata;
    const hasReachedLimit =
      hasMetadata &&
      this.#totalPortfolios >= createPortfolioPermission.metadata.count;

    if (hasPermission && !hasReachedLimit) {
      const response = RecurrenceExecute.create({ context });

      return right(response.value as RecurrenceExecute);
    }

    const response = RecurrenceExecute.create({
      context,
      suggestiveActions: [
        SuggestiveAction.create({
          title: "Assine o Kinvo Premium",
          message: "Esse recurso está disponível apenas para assinantes",
          action: SuggestiveActionType.SUBSCRIBE,
        }).value as SuggestiveAction,
      ],
    });

    return left(response.value as RecurrenceExecute);
  }
}
