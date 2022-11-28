import { DomainError, Portfolio } from "../../../domain";
import { BaseRequest } from "../../../domain";

export type HomeProps = {
  baseRequest: BaseRequest<DomainError, Portfolio>;
  portfolios: Portfolio[];
};
