import { DomainError, Portfolio } from "../../../domain";
import { BaseRequest } from "../../../domain";

export type HomeProps = {
  createPortfolio: BaseRequest<DomainError, Portfolio>;
  portfolios: Portfolio[];
};
