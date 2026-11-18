/** Join class names, skipping falsy values. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** Plain-text version of a rich-text title (strings and { highlight } segments). */
export const richTextToString = (value) =>
  Array.isArray(value)
    ? value.map((part) => (typeof part === 'string' ? part : part.highlight)).join('')
    : String(value ?? '');

/** Two-digit index label: 1 -> "01". */
export const pad2 = (n) => String(n).padStart(2, '0');

export const BUILD_YEAR = new Date().getFullYear();
