export function reverse(str: string): string {
  if (!str || str.length === 0) {
    return str;
  }
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str.charAt(i);
  }
  return reversed;
}
