import { getRandomInt, sleep } from "../../utils";
import { DomainError } from "../errors";
import {
  left,
  Permission,
  PermissionOperation,
  PromiseEither,
  right,
} from "../models";
import { GetPermissions } from "./get-permissions";

export class MockedGetPermissions implements GetPermissions {
  public readonly action = "list_permissions";
  public readonly resource = "permissions";
  public readonly operation = PermissionOperation.READ;

  public async execute(): PromiseEither<DomainError, Permission[]> {
    await sleep(getRandomInt(1000, 3000));

    if (CREATE_MAX_3_PORTFOLIOS.isLeft()) {
      return left(CREATE_MAX_3_PORTFOLIOS.value);
    }

    return right([CREATE_MAX_3_PORTFOLIOS.value]);
  }
}

const CREATE_MAX_3_PORTFOLIOS =
  Permission.create<Permission.CreatePortfolioMetadata>({
    action: "create_portfolio",
    operation: PermissionOperation.CREATE,
    resource: "portfolios",
    metadata: { count: 3 },
  });
