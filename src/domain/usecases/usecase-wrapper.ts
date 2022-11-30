import { BaseRequestError, DomainError } from "../errors";
import { left, PromiseEither } from "../models";
import { RequestContext } from "../requests";
import { BaseRequest } from "./base-request";
import { BaseUsecase } from "./base-usecase";

export class UsecaseWrapper<
  LeftReturn extends DomainError = DomainError,
  RightReturn = any
> extends BaseRequest {
  constructor(private readonly usecase: BaseUsecase<LeftReturn, RightReturn>) {
    super();
  }

  public handle<RequestArgs>(
    context: RequestContext<RequestArgs>
  ): PromiseEither<LeftReturn | BaseRequest.Errors, RightReturn> {
    console.log("🚀 UsecaseWrapper ~ handle ~ context", context);

    if (this.thisUsecaseMustHandleThisAction(context)) {
      return this.usecase.execute(context.data);
    }

    return Promise.resolve(
      left(new BaseRequestError("Unhandled request", [], UsecaseWrapper.name))
    );
  }

  private thisUsecaseMustHandleThisAction<RequestArgs>(
    context: RequestContext<RequestArgs>
  ): boolean {
    const isSomeAction = this.usecase.action === context.action;
    const isSomeResource = this.usecase.resource === context.resource;
    const isSomeOperation = this.usecase.operation === context.operation;

    return isSomeAction && isSomeResource && isSomeOperation;
  }
}
