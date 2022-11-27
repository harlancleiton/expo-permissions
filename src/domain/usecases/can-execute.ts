import { PermissionOperation } from "../models";

export interface RequestAction {
  action: string; // create_portfolio
  resource: string; // portfolios
  operation: PermissionOperation; // PermissionOperation.CREATE
}

export interface CanExecute {
  execute(request: RequestAction): Promise<boolean>;
}
