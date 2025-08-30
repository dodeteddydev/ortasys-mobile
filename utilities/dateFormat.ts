import { format } from "date-fns";

export const dateFormat = (
  date: string | number | Date,
  formatType: "dash" | "slash" = "dash"
): string => {
  const formatStr = formatType === "dash" ? "yyyy-MM-dd" : "yyyy/MM/dd";
  const formattedDate = format(date, formatStr);
  return formattedDate;
};
