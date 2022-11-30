import {
  CanExecuteCreatePortfolio,
  Permission,
  CheckPermission,
  UsecaseWrapper,
} from "../../../domain";
import { CreatePortfolioDispatchAdapter, useAppDispatch } from "../../store";

// TODO criar aquivo
export function makeCanExecuteCreatePortfolio(
  totalPortfolios: number,
  permissions: Permission[]
): CanExecuteCreatePortfolio {
  return new CanExecuteCreatePortfolio(totalPortfolios, permissions);
}

export function makeCreatePortfolio(
  totalPortfolios: number,
  permissions: Permission[],
  dispatch: ReturnType<typeof useAppDispatch>
) {
  const canExecuteCreatePortfolio = makeCanExecuteCreatePortfolio(
    totalPortfolios,
    permissions
  );

  const checkPermission = new CheckPermission(canExecuteCreatePortfolio);
  const usecaseWrapped = new UsecaseWrapper(
    new CreatePortfolioDispatchAdapter(dispatch)
  );

  checkPermission.setNext(usecaseWrapped);

  return checkPermission;
}
