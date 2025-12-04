export function truncate(str: string, length: number, ending = "..."): string {
  if (!str || length <= 0) {
    return "";
  }
  if (str.length <= length) {
    return str;
  }

  const endingLength = ending.length;
  if (length <= endingLength) {
    return ending.slice(0, length);
  }

  return str.slice(0, length - endingLength) + ending;
}
