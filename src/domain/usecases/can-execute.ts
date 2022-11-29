import { Either, ExecuteAction, RecurrenceExecute } from "../models";

export interface CanExecute {
  execute(context: ExecuteAction): Either<RecurrenceExecute, RecurrenceExecute>;
}
