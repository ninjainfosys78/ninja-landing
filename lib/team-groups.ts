const LEADERSHIP_ROLE_PATTERN = /\b(ceo|founder|chief|cto|managing director|product)\b/i;

/** Decided on the English role so the split is stable across display languages. */
export function isLeadershipRole(role: string): boolean {
  return LEADERSHIP_ROLE_PATTERN.test(role);
}
