import { ExecuteAction, PromiseEither, RecurrenceExecute } from "../models";

export interface CanExecute {
  execute(
    context: ExecuteAction
  ): PromiseEither<RecurrenceExecute, RecurrenceExecute>;
}
