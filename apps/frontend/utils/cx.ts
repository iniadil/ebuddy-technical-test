/**
 * Combines multiple class names into a single string, filtering out falsy values.
 *
 * @param {...(string|boolean|undefined|null)[]} classes - List of class names or conditional expressions
 * @returns {string} - Combined class names separated by spaces
 *
 * @example
 * // Returns "btn btn-primary"
 * cx('btn', 'btn-primary')
 *
 * @example
 * // Returns "btn btn-large" (filters out false condition)
 * cx('btn', isLarge && 'btn-large', isPrimary && 'btn-primary')
 */
export function cx(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
