import { isNil } from "../type/isNil";
import { isString } from "../type/isString";
import { isNumber } from "../type/isNumber";

export function unix(date: Date | string | number): number {
  if (isNil(date)) {
    throw new Error("Date must not be null or undefined");
  }

  if (isString(date)) {
    return Math.floor(new Date(date).getTime() / 1000);
  } else if (isNumber(date)) {
    return Math.floor(date / 1000);
  } else if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  } else {
    throw new TypeError("Invalid date type. Expected Date, string, or number.");
  }
}
