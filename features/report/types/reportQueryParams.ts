import { DefaultQueryParams } from "@/types/queryParamsType";

export type ReportQueryParams = DefaultQueryParams & {
  agentId?: number;
  stayStartDate?: string;
  stayEndDate?: string;
};
