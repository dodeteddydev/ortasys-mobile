import { format } from "date-fns";

export const dateFormat = (
  date: string,
  formatType: "dash" | "slash" | "long" = "dash"
): string => {
  let formatStr: string;

  switch (formatType) {
    case "slash":
      formatStr = "yyyy/MM/dd";
      break;
    case "long":
      formatStr = "d MMMM yyyy";
      break;
    case "dash":
    default:
      formatStr = "yyyy-MM-dd";
  }

  return date ? format(new Date(date), formatStr) : "";
};
