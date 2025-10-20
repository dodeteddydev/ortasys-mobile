import { DefaultQueryParams } from "@/types/queryParamsType";

export type ReportQueryParams = DefaultQueryParams & {
  stayStartDate?: string;
  stayEndDate?: string;
};
