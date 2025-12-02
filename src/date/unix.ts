import { isNil } from "../type/isNil";

export function unix(date: Date | string | number): number {
  if (isNil(date)) {
    throw new Error("Date must not be null or undefined");
  }

  if (typeof date === "string") {
    return Math.floor(new Date(date).getTime() / 1000);
  } else if (typeof date === "number") {
    return Math.floor(date / 1000);
  } else if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  } else {
    throw new TypeError("Invalid date type. Expected Date, string, or number.");
  }
}
