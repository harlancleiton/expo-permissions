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

export function makeCreatePortfolio(
  totalPortfolios: number,
  dispatch: ReturnType<typeof useAppDispatch>
) {
  const canExecuteCreatePortfolio = new CanExecuteCreatePortfolio(
    totalPortfolios,
    [CREATE_MAX_3_PORTFOLIOS]
  );
  const checkPermission = new CheckPermission(canExecuteCreatePortfolio);
  const usecaseWrapped = new UsecaseWrapper(
    new CreatePortfolioDispatchAdapter(dispatch)
  );

  checkPermission.setNext(usecaseWrapped);

  return checkPermission;
}
