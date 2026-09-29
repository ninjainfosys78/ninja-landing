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
    imageUrl: "/ramesh-chhetri.png",
    linkedinUrl: "https://www.linkedin.com/in/rameshchhetriofficial/",
    bio_en: "Ramesh drives Ninja Infosys's vision for what government technology can be — not just functional, but genuinely trustworthy. Under his leadership, the company has taken on e-governance systems that now touch hundreds of thousands of citizens, always closing the gap between deep technical craft and the practical realities institutions face on the ground. He believes the best technology disappears into the background, and every product he ships is measured against one question: does it make people's lives easier?",
    bio_ne: "रमेशले निन्जा इन्फोसिसलाई सरकारी प्रविधि कस्तो हुनुपर्छ भन्ने दृष्टिकोण अगाडि बढाउनुहुन्छ — कार्यात्मक मात्र होइन, साँच्चिकै भरपर्दो। उहाँको नेतृत्वमा, कम्पनीले लाखौं नागरिकसम्म पुग्ने ई-सुशासन प्रणालीहरू निर्माण गरेको छ, जहाँ गहिरो प्राविधिक सीप र संस्थाहरूको व्यावहारिक आवश्यकताबीचको खाडललाई सधैं कम गरिन्छ। उहाँको विश्वास छ — उत्कृष्ट प्रविधि पृष्ठभूमिमा हराएर जान्छ, र उहाँले बनाउने हरेक उत्पादनलाई एउटै प्रश्नले जाँचिन्छ: के यसले मानिसको जीवन सहज बनाउँछ?",
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
