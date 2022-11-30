import { DomainError, Portfolio } from "../../../../domain";

export type PortfolioOperation = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: DomainError | null;
  value: Portfolio.JSON | null;
};

export type PortfolioState = {
  portfolios: Portfolio.JSON[];
  creation: PortfolioOperation;
};

export type PayloadCreatePortfolio = Portfolio.CreateProps;
