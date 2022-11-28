import { Permission } from "../models";
import { CanExecute, RequestAction } from "./can-execute";

export class CanExecuteCreatePortfolio implements CanExecute {
  #totalPortfolios = 0;
  #permissions: Permission<Permission.CreatePortfolioMetadata>[] = [];

  constructor(
    totalPortfolios: number,
    permissions: Permission<Permission.CreatePortfolioMetadata>[]
  ) {
    this.#totalPortfolios = totalPortfolios;
    this.#permissions = permissions;
  }

  public async execute(request: RequestAction): Promise<boolean> {
    console.log(
      "🚀 ~ CheckPermissionCreatePortfolio ~ execute ~ request",
      request
    );

    const createPortfolioPermission = this.#permissions.find(
      (permission) => permission.action === request.action
    );

    if (!createPortfolioPermission) return false;

    if (!createPortfolioPermission.metadata) return false;

    return createPortfolioPermission.metadata.count > this.#totalPortfolios;
  }
}
