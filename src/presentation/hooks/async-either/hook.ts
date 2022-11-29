import React, { DependencyList } from "react";

import { Right } from "../../../domain";
import useMountedState from "../mounted/hook";
import {
  State,
  PromiseStatus,
  Action,
  AsyncEitherReturn,
  FunctionReturningPromiseEither,
  StateFromFunctionReturningPromiseEither,
} from "./types";

const INITIAL_STATE: State<any, any> = {
  status: PromiseStatus.IDLE,
  data: null,
  error: null,
};

const eitherReducer = <L, A>(
  prevState: State<L, A>,
  action: Action<L, A>
): State<L, A> => {
  switch (action.type) {
    case PromiseStatus.IDLE:
      return INITIAL_STATE;
    case PromiseStatus.PENDING:
      return {
        data: undefined,
        error: undefined,
        status: PromiseStatus.PENDING,
      };
    case PromiseStatus.SUCCESS:
      return {
        data: action.payload,
        error: undefined,
        status: PromiseStatus.SUCCESS,
      };
    case PromiseStatus.ERROR:
      return {
        data: undefined,
        error: action.payload,
        status: PromiseStatus.ERROR,
      };
    default:
      return prevState;
  }
};

export default function useAsyncEither<
  T extends FunctionReturningPromiseEither
>(fn: T, deps: DependencyList = []): AsyncEitherReturn<T> {
  const lastCallId = React.useRef(0);
  const isMounted = useMountedState();
  const [state, setState] = React.useState<
    StateFromFunctionReturningPromiseEither<T>
  >({
    status: PromiseStatus.IDLE,
  });

  const callback = React.useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      const callId = ++lastCallId.current;

      if (state.status !== PromiseStatus.PENDING) {
        setState({ status: PromiseStatus.PENDING });
      }

      return fn(...args).then((either) => {
        if (!isMounted()) return either.value;

        if (callId !== lastCallId.current) return either.value;

        if (either.isLeft()) {
          setState({
            status: PromiseStatus.ERROR,
            error: either.value,
          });
        } else {
          setState({
            data: (either as Right<any, any>).value,
            status: PromiseStatus.SUCCESS,
          });
        }

        return either.value;
      }) as ReturnType<T>;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return [state, callback as unknown as T];
}
