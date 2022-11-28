import { DomainError } from "../errors";
import { Either, left, right } from "./either";
import { ExecuteAction } from "./execute-action";
import { SuggestiveAction } from "./suggestive-action";

export class RecurrenceExecute {
  public static create(
    props: RecurrenceExecute.CreateProps
  ): Either<RecurrenceExecute.Errors, RecurrenceExecute> {
    const { context, suggestiveActions = [] } = props;

    return right(new RecurrenceExecute({ context, suggestiveActions }));
  }

  public static fromJSON(
    json: RecurrenceExecute.JSON
  ): Either<RecurrenceExecute.Errors, RecurrenceExecute> {
    const contextFromJSON = ExecuteAction.fromJSON(json.context);

    if (contextFromJSON.isLeft()) {
      return left(contextFromJSON.value);
    }

    const suggestiveActionsFromJSON = json.suggestiveActions.map(
      (suggestiveAction) => {
        const sa = SuggestiveAction.fromJSON(suggestiveAction);
        return sa;
      }
    );

    const suggestiveActionsRight = suggestiveActionsFromJSON
      .filter((sa) => sa.isRight())
      .map((sa) => sa.value as SuggestiveAction);

    return RecurrenceExecute.create({
      context: contextFromJSON.value,
      suggestiveActions: suggestiveActionsRight,
    });
  }

  public toJSON(): RecurrenceExecute.JSON {
    return {
      context: this.context.toJSON(),
      suggestiveActions: this.suggestiveActions.map((sa) => sa.toJSON()),
    };
  }

  private constructor(props: RecurrenceExecute.Props) {
    this.context = props.context;
    this.suggestiveActions = props.suggestiveActions;
  }

  public readonly context: ExecuteAction;
  public readonly suggestiveActions: SuggestiveAction[];
}

export namespace RecurrenceExecute {
  export type Errors = DomainError;

  export type Props = {
    context: ExecuteAction;
    suggestiveActions: SuggestiveAction[];
  };

  export type CreateProps = {
    context: ExecuteAction;
    suggestiveActions?: SuggestiveAction[];
  };

  export type JSON = {
    context: ExecuteAction.JSON;
    suggestiveActions: SuggestiveAction.JSON[];
  };
}
