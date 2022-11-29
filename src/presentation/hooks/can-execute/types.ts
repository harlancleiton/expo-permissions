import React from "react";

import { CanExecute } from "../../../domain";

export interface CanExecuteContextProps {
  canExecute: CanExecute;
}

export interface CanExecuteProviderProps {
  children: React.ReactNode;
  canExecute: CanExecute;
}
