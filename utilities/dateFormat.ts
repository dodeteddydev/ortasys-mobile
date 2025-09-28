import { format } from "date-fns";

export const dateFormat = (
  dateStr: string,
  formatType: "dash" | "slash" | "long" | "day-long" | "time" = "dash"
): string => {
  if (!dateStr) return "";

  if (formatType === "time") {
    const date = new Date(dateStr);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
  }

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
    case "dash":
    default:
      formatStr = "yyyy-MM-dd";
  }

  return format(new Date(dateStr), formatStr);
};

export const convertDateToUtcFormatButLocalTime = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    ".000Z"
  );
};

export const normalizeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};
