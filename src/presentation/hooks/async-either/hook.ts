import React, { DependencyList } from "react";

import { Right } from "../../../domain";
import useMountedState from "../mounted/hook";
import {
  State,
  PromiseStatus,
  AsyncEitherReturn,
  FunctionReturningPromiseEither,
  StateFromFunctionReturningPromiseEither,
  ActionFromFunctionReturningPromiseEither,
} from "./types";

const INITIAL_STATE: State<any, any> = {
  status: PromiseStatus.IDLE,
  data: null,
  error: null,
};

const eitherReducer = <
  T extends FunctionReturningPromiseEither = FunctionReturningPromiseEither
>(
  prevState: StateFromFunctionReturningPromiseEither<T>,
  action: ActionFromFunctionReturningPromiseEither<T>
): StateFromFunctionReturningPromiseEither<T> => {
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

  const [state, dispatch] = React.useReducer(eitherReducer, INITIAL_STATE);

  const callback = React.useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      const callId = ++lastCallId.current;

      if (state.status !== PromiseStatus.PENDING) {
        dispatch({ type: PromiseStatus.PENDING });
      }

      return fn(...args).then((either) => {
        if (!isMounted()) return either.value;

        if (callId !== lastCallId.current) return either.value;

        if (either.isLeft()) {
          dispatch({ type: PromiseStatus.ERROR, payload: either.value });
        } else {
          dispatch({
            type: PromiseStatus.SUCCESS,
            payload: (either as Right<any, any>).value,
          });
        }

        return either.value;
      }) as ReturnType<T>;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.status, ...deps]
  );

  return [state, callback as unknown as T];
}
