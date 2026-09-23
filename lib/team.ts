import "server-only";
import { extractLinkedIn } from "@/lib/team-linkedin";
import { fetchDcmContentList, fetchDcmSubContent, type DcmSubContentDetail } from "@/lib/dcm-client";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  name_ne?: string;
  role_ne?: string;
  imageUrl: string | null;
  linkedinUrl?: string | null;
  bio_en: string;
  bio_ne: string;
};

// Leadership profiles and the broader team roster are each authored as
// sub-content items under their own DCM content slug, inside the tenant's
// single DCM category (env.DCM_CATEGORY_SLUG). DCM's sub-content schema has
// no dedicated "role" field, so by convention the first line of the
// (Nepali/English) description is the person's role and everything after it
// is their bio. "leadership" gets the large individual spotlight treatment
// on the About page; "team" renders as a grid of everyone else.
const LEADERSHIP_CONTENT_SLUG = "leadership";
const TEAM_CONTENT_SLUG = "team";

// Every leadership record has sort_order 0 in DCM, so the API returns them
// newest-first. This list pins the on-page order; anyone not listed follows in
// the order DCM returned them.
const LEADERSHIP_DISPLAY_ORDER = ["ramesh", "trilochan", "kritisha", "nabin"];

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: "fallback-ramesh",
    name: "Ramesh Chhetri",
    role: "Founder & CEO",
    name_ne: "रमेश क्षेत्री",
    role_ne: "संस्थापक र सीईओ",
    imageUrl: "/ceo.jpg",
    linkedinUrl: "https://www.linkedin.com/in/rameshchhetriofficial/",
    bio_en: "He drives the company’s strategic vision and commitment to digital transformation. He focuses on delivering high-impact IT solutions and e-governance systems, bridging the gap between technical innovation and practical business needs.",
    bio_ne: "उहाँले कम्पनीको रणनीतिक दृष्टिकोण र डिजिटल रूपान्तरणप्रतिको प्रतिबद्धतालाई अगाडि बढाउनुहुन्छ। उहाँ प्राविधिक आविष्कार र व्यावहारिक व्यापारिक आवश्यकताहरूबीचको अन्तरलाई कम गर्दै उच्च-प्रभाव आईटी समाधानहरू र ई-सुशासन प्रणालीहरू प्रदान गर्नमा केन्द्रित हुनुहुन्छ।",
  },
];

function splitRoleAndBio(description: string | null): { role: string; bio: string } {
  const text = (description ?? "").trim();
  if (!text) return { role: "", bio: "" };

  const newlineIndex = text.indexOf("\n");
  if (newlineIndex === -1) return { role: text, bio: "" };

  return {
    role: text.slice(0, newlineIndex).trim(),
    bio: text.slice(newlineIndex + 1).trim(),
  };
}

async function fetchTeamFromDcm(contentSlug: string): Promise<TeamMember[]> {
  const list = await fetchDcmContentList(contentSlug);
  const items = list?.items ?? [];
  if (items.length === 0) return [];

  return Promise.all(
    items.map(async (item): Promise<TeamMember> => {
      const detail = await fetchDcmSubContent(contentSlug, item.slug);
      const resolved: DcmSubContentDetail = detail?.item ?? item;

      const descriptionNe = extractLinkedIn(resolved.description);
      const descriptionEn = extractLinkedIn(resolved.eng_description);
      const { role: roleNe, bio: bioNe } = splitRoleAndBio(descriptionNe.text);
      const { role: roleEn, bio: bioEn } = splitRoleAndBio(descriptionEn.text);
      const file = resolved.files?.[0];

      return {
        id: resolved.id,
        name: resolved.eng_name || resolved.name,
        name_ne: resolved.name,
        role: roleEn || roleNe,
        role_ne: roleNe,
        bio_en: bioEn || bioNe,
        bio_ne: bioNe,
        imageUrl: file?.file_url ?? null,
        linkedinUrl: descriptionEn.linkedinUrl ?? descriptionNe.linkedinUrl,
      };
    })
  );
}

function leadershipRank(member: TeamMember): number {
  const name = member.name.toLowerCase();
  const rank = LEADERSHIP_DISPLAY_ORDER.findIndex((firstName) => name.startsWith(firstName));
  return rank === -1 ? LEADERSHIP_DISPLAY_ORDER.length : rank;
}

/** Founders/execs — rendered as large individual spotlights on the About page. */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const members = await fetchTeamFromDcm(LEADERSHIP_CONTENT_SLUG);
  if (members.length === 0) return FALLBACK_TEAM;
  return [...members].sort((a, b) => leadershipRank(a) - leadershipRank(b));
}

/** The rest of the company — rendered as a premium card grid. Empty until authored in DCM. */
export async function getTeamGridMembers(): Promise<TeamMember[]> {
  return fetchTeamFromDcm(TEAM_CONTENT_SLUG);
}
