export function capitalize(str: string): string {
  if (str.length === 0) {
    return str;
  }

  // If the string starts with a space, check what comes after the spaces
  if (str.charAt(0) === " ") {
    let i = 0;
    // Skip all leading spaces
    while (i < str.length && str.charAt(i) === " ") {
      i++;
    }

    // If we found a character after spaces, check if it's alphabetic
    if (i < str.length && /[a-zA-Z]/.test(str.charAt(i))) {
      // Only capitalize if the first non-space character is alphabetic
      return str.slice(0, i) + str.charAt(i).toUpperCase() + str.slice(i + 1);
    }

    // If no character after spaces or first non-space character is not alphabetic, return unchanged
    return str;
  }

  // Only capitalize if the first character is alphabetic
  if (/[a-zA-Z]/.test(str.charAt(0))) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // If first character is not alphabetic (and not space), return the original string
  return str;
}
