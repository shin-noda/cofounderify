// src/utils/RegisterValidation.ts

export function isNonEmptyTrimmed(value: string): boolean {
  return value.trim().length > 0;
}

const prettyFieldNames: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  displayName: "Display Name",
};

export function validateRequiredFields(fields: Record<string, string>): string | null {
  for (const [key, value] of Object.entries(fields)) {
    if (!isNonEmptyTrimmed(value)) {
      return `${prettyFieldNames[key] || key} cannot be empty or just spaces.`;
    }
  }
  return null;
}