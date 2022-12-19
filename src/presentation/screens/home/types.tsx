import { DomainError, Portfolio } from "../../../domain";
import { BaseRequest } from "../../../domain";

export type HomeProps = {
  // CreatePortfolio
  createPortfolio: BaseRequest<DomainError, Portfolio>;
  // ListPortfolios
  portfolios: Portfolio[];
};
