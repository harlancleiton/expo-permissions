import { BaseRequestError, DomainError } from "../errors";
import { left, PromiseEither } from "../models";
import { RequestContext } from "../requests";

export abstract class BaseRequest<
  LeftReturn extends DomainError = DomainError,
  RightReturn = any
> {
  protected next: BaseRequest<
    LeftReturn | BaseRequest.Errors,
    RightReturn
  > | null = null;

  public setNext(
    next: BaseRequest<LeftReturn | BaseRequest.Errors, RightReturn>
  ): BaseRequest<LeftReturn | BaseRequest.Errors, RightReturn> {
    this.next = next;
    return next;
  }

  public async handle<RequestArgs = any>(
    context: RequestContext<RequestArgs>
  ): PromiseEither<LeftReturn | BaseRequest.Errors, RightReturn> {
    console.log("🚀 BaseRequest ~ handle ~ context", context);

    if (this.next) {
      return this.next.handle(context);
    }

    return left(new BaseRequestError("Unhandled request", BaseRequest.name));
  }
}

export namespace BaseRequest {
  export type Errors = BaseRequestError;
}
