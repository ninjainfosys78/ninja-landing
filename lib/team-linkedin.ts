const LINKEDIN_URL_PATTERN = /https?:\/\/(?:[\w-]+\.)?linkedin\.com\/\S+/i;

export interface DescriptionWithoutLinkedIn {
  text: string | null;
  linkedinUrl: string | null;
}

/** Pulls the first LinkedIn URL out of a DCM description and drops that line so it never shows up in the bio. */
export function extractLinkedIn(description: string | null): DescriptionWithoutLinkedIn {
  if (!description) return { text: description, linkedinUrl: null };

  const lines = description.split("\n");
  const linkLine = lines.find((line) => LINKEDIN_URL_PATTERN.test(line));
  if (!linkLine) return { text: description, linkedinUrl: null };

  return {
    text: lines.filter((line) => line !== linkLine).join("\n"),
    linkedinUrl: linkLine.match(LINKEDIN_URL_PATTERN)?.[0] ?? null,
  };
}
