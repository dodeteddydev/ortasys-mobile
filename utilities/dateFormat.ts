import { format } from "date-fns";

export const dateFormat = (
  date: string,
  formatType: "dash" | "slash" | "long" | "day-long" | "time" = "dash"
): string => {
  let formatStr: string;

  switch (formatType) {
    case "slash":
      formatStr = "yyyy/MM/dd";
      break;
    case "long":
      formatStr = "d MMMM yyyy";
      break;
    case "day-long":
      formatStr = "EEEE, d MMMM yyyy";
      break;
    case "time":
      formatStr = "HH:mm";
      break;
    case "dash":
    default:
      formatStr = "yyyy-MM-dd";
  }

  return date ? format(new Date(date), formatStr) : "";
};
