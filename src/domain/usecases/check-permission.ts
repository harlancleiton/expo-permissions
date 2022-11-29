import { BaseRequestError, DomainError } from "../errors";
import { left, PromiseEither, SuggestiveAction } from "../models";
import { RequestContext } from "../requests";
import { BaseRequest } from "./base-request";
import { CanExecute } from "./can-execute";

export class CheckPermission<
  Errors extends DomainError = DomainError,
  ReturnType = any
> extends BaseRequest<Errors, ReturnType> {
  constructor(private readonly canExecute: CanExecute) {
    super();
  }

  public async handle<RequestArgs>(
    context: RequestContext<RequestArgs>
  ): PromiseEither<Errors | BaseRequest.Errors, ReturnType> {
    console.log("🚀 CheckPermission ~ handle ~ context", context);

    const recurrenceExecute = await this.canExecute.execute(context);

    if (recurrenceExecute.isRight()) {
      return super.handle(context);
    }

    const suggestiveActions: SuggestiveAction[] =
      // @ts-ignore
      recurrenceExecute.value.suggestiveActions;

    return left(
      new BaseRequestError(
        "You don't have permission to execute this action",
        suggestiveActions,
        CheckPermission.name,
        "YOU_DONT_HAVE_PERMISSION_TO_EXECUTE_THIS_ACTION"
      )
    );
  }
}
