import React from "react";

import {
  Either,
  ExecuteAction,
  RecurrenceExecute,
} from "../../../domain/models";
import { CanExecuteContext } from "./context";

export function useCanExecute(
  context: ExecuteAction
): Either<RecurrenceExecute, RecurrenceExecute> {
  const { canExecute } = React.useContext(CanExecuteContext);
  const refContext = React.useRef(context);

  const either = React.useMemo(
    () => canExecute.execute(refContext.current),
    [canExecute]
  );

  return either;
}
