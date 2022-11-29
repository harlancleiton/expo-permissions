import React from "react";

import { ExecuteAction, RecurrenceExecute } from "../../../domain/models";
import { State } from "../async-either";
import useAsyncEither from "../async-either/hook";
import { CanExecuteContext } from "./context";

export function useCanExecute(
  context: ExecuteAction
): State<RecurrenceExecute, RecurrenceExecute> {
  const { canExecute } = React.useContext(CanExecuteContext);
  const refContext = React.useRef(context);

  const [state, handleCanExecute] = useAsyncEither(
    () => canExecute.execute(refContext.current),
    [canExecute]
  );

  React.useEffect(() => {
    handleCanExecute();
  }, [handleCanExecute]);

  return state;
}
