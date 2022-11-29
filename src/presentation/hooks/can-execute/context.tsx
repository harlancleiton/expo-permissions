import React from "react";

import { CanExecuteContextProps, CanExecuteProviderProps } from "./types";

export const CanExecuteContext = React.createContext<CanExecuteContextProps>(
  {} as CanExecuteContextProps
);

export function CanExecuteProvider({
  children,
  canExecute,
}: CanExecuteProviderProps) {
  return (
    <CanExecuteContext.Provider value={{ canExecute }}>
      {children}
    </CanExecuteContext.Provider>
  );
}
