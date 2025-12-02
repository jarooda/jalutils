import { isNil } from "../type/isNil";

export function randomFromArray<T>(array: T[]): T {
  if (isNil(array) || array.length === 0) {
    throw new Error("Array must not be null or empty");
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
