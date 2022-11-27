import { CreatePortfolio, Portfolio } from "../../../domain";

export type HomeProps = {
  createPortfolio: CreatePortfolio;
  portfolios: Portfolio[];
};
