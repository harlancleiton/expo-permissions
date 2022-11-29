import { Either, PromiseEither } from "../../../domain";

export enum PromiseStatus {
  IDLE = "idle",
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
}

export interface State<L, A> {
  status: PromiseStatus;
  data?: A;
  error?: L;
}

export type Action<L, A> =
  | { type: PromiseStatus.IDLE }
  | { type: PromiseStatus.PENDING }
  | { type: PromiseStatus.SUCCESS; payload: A }
  | { type: PromiseStatus.ERROR; payload: L };

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

export type PromiseEitherType<P extends Promise<Either<any, any>>> =
  P extends Promise<Either<infer L, infer A>> ? Either<L, A> : never;

export type PromiseEitherRight<P extends Promise<Either<any, any>>> =
  P extends Promise<Either<infer L, infer A>> ? A : never;

export type PromiseEitherLeft<P extends Promise<Either<any, any>>> =
  P extends Promise<Either<infer L, infer A>> ? L : never;

export type FunctionReturningPromiseEither = (
  ...args: any[]
) => PromiseEither<any, any>;

export type StateFromFunctionReturningPromiseEither<
  T extends FunctionReturningPromiseEither
> = State<PromiseEitherLeft<ReturnType<T>>, PromiseEitherRight<ReturnType<T>>>;

export type AsyncEitherReturn<
  T extends FunctionReturningPromiseEither = FunctionReturningPromiseEither
> = [StateFromFunctionReturningPromiseEither<T>, T];
