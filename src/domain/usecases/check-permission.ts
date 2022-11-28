import { BaseRequestError, DomainError } from "../errors";
import { left, PromiseEither } from "../models";
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

    const isAllowed = await this.canExecute.execute(context);

    if (isAllowed) {
      return super.handle(context);
    }

    return left(
      new BaseRequestError("Request not allowed", CheckPermission.name)
    );
  }
}
