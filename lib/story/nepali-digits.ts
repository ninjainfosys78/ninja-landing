const NEPALI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliDigits(value: string): string {
  return value.replace(/\d/g, (digit) => NEPALI_DIGITS[Number(digit)]);
}
