import {
  CanExecuteCreatePortfolio,
  Permission,
  PermissionOperation,
  CheckPermission,
  UsecaseWrapper,
} from "../../../domain";
import { CreatePortfolioDispatchAdapter, useAppDispatch } from "../../store";

const CREATE_MAX_3_PORTFOLIOS =
  Permission.create<Permission.CreatePortfolioMetadata>({
    action: "create_portfolio",
    operation: PermissionOperation.CREATE,
    resource: "portfolios",
    metadata: { count: 3 },
  }).value as Permission<Permission.CreatePortfolioMetadata>;

// TODO criar aquivo
export function makeCanExecuteCreatePortfolio(
  totalPortfolios: number
): CanExecuteCreatePortfolio {
  return new CanExecuteCreatePortfolio(totalPortfolios, [
    CREATE_MAX_3_PORTFOLIOS,
  ]);
}

export function makeCreatePortfolio(
  totalPortfolios: number,
  dispatch: ReturnType<typeof useAppDispatch>
) {
  const canExecuteCreatePortfolio =
    makeCanExecuteCreatePortfolio(totalPortfolios);

  const checkPermission = new CheckPermission(canExecuteCreatePortfolio);
  const usecaseWrapped = new UsecaseWrapper(
    new CreatePortfolioDispatchAdapter(dispatch)
  );

  checkPermission.setNext(usecaseWrapped);

  return checkPermission;
}
