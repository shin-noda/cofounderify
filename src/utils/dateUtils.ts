import { Timestamp } from "firebase/firestore";

/**
 * Convert Firestore Timestamp or ISO string to JavaScript Date.
 * If input is undefined/null, returns null.
 */
export function toDate(input?: Timestamp | string | null): Date | null {
  if (!input) return null;

  if (typeof input === "string") {
    const date = new Date(input);
    return isNaN(date.getTime()) ? null : date;
  }

  if (input instanceof Timestamp) {
    return input.toDate();
  }

  return null;
}

/**
 * Format a Firestore Timestamp or string date to a readable date string.
 * If invalid or undefined, returns fallback text.
 */
export function formatDate(
  input?: Timestamp | string | null,
  fallback = "No date"
): string {
  const date = toDate(input);
  if (!date) return fallback;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}