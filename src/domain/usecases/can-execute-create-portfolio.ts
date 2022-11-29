import { SuggestiveActionType } from "../enums";
import {
  ExecuteAction,
  left,
  Permission,
  PromiseEither,
  RecurrenceExecute,
  right,
  SuggestiveAction,
} from "../models";
import { CanExecute } from "./can-execute";

export class CanExecuteCreatePortfolio implements CanExecute {
  #totalPortfolios = 0;
  #permissions: Permission<Permission.CreatePortfolioMetadata>[] = [];

  constructor(
    totalPortfolios: number,
    permissions: Permission<Permission.CreatePortfolioMetadata>[]
  ) {
    this.#totalPortfolios = totalPortfolios;
    this.#permissions = permissions;
  }

  public async execute(
    context: ExecuteAction
  ): PromiseEither<RecurrenceExecute, RecurrenceExecute> {
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
