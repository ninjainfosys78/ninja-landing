import "server-only";
import { fetchDcmContentList, fetchDcmSubContent, type DcmSubContentDetail } from "@/lib/dcm-client";

export type Partner = {
  id: string;
  name_en: string;
  name_ne: string;
  category_en: string;
  category_ne: string;
  description_en: string;
  description_ne: string;
  logoUrl: string;
  order: number;
};

// Each partner category is its own DCM "list" content under the tenant's
// category (env.DCM_CATEGORY_SLUG); the content's own name/eng_name become
// the category heading shown on the page, in this display order.
const CATEGORY_CONTENT_SLUGS = ["strategic-partners", "technology-partners", "governance-ngo"];

// Fallback data — shown until each category content has real items.
const FALLBACK_PARTNERS: Partner[] = [
  {
    id: "fallback-nepal-telecom",
    name_en: "Nepal Telecom",
    name_ne: "नेपाल टेलिकम",
    category_en: "Strategic Partners",
    category_ne: "रणनीतिक साझेदारहरू",
    description_en: "Digital infrastructure and nationwide connectivity solutions.",
    description_ne: "डिजिटल पूर्वाधार र राष्ट्रव्यापी कनेक्टििव्हिटी समाधान।",
    logoUrl: "/placeholder-logo.png",
    order: 1,
  },
  {
    id: "fallback-ncell",
    name_en: "Ncell",
    name_ne: "एनसेल",
    category_en: "Strategic Partners",
    category_ne: "रणनीतिक साझेदारहरू",
    description_en: "Collaborative telecommunication network optimizations.",
    description_ne: "सहयोगी दूरसञ्चार नेटवर्क अप्टिमाइजेसनहरू।",
    logoUrl: "/placeholder-logo.png",
    order: 2,
  },
  {
    id: "fallback-worldlink",
    name_en: "WorldLink",
    name_ne: "वर्ल्डलिङ्क",
    category_en: "Strategic Partners",
    category_ne: "रणनीतिक साझेदारहरू",
    description_en: "High-speed internet backbone and enterprise systems.",
    description_ne: "उच्च-गति इन्टरनेट ब्याकबोन र एन्टरप्राइज प्रणालीहरू।",
    logoUrl: "/placeholder-logo.png",
    order: 3,
  },
  {
    id: "fallback-prabhu-bank",
    name_en: "Prabhu Bank",
    name_ne: "प्रभु बैंक",
    category_en: "Technology Partners",
    category_ne: "प्रविधि साझेदारहरू",
    description_en: "Streamlined fintech ecosystems and digital corporate banking solutions.",
    description_ne: "सुव्यवस्थित फिनटेक इकोसिस्टम र डिजिटल कर्पोरेट बैंकिङ समाधान।",
    logoUrl: "/placeholder-logo.png",
    order: 4,
  },
  {
    id: "fallback-kathmandu-municipality",
    name_en: "Kathmandu Municipality",
    name_ne: "काठमाडौं नगरपालिका",
    category_en: "Governance & NGO",
    category_ne: "सुशासन र एनजीओ",
    description_en: "Smart city initiatives and digital citizen services.",
    description_ne: "स्मार्ट सिटी पहलहरू र डिजिटल नागरिक सेवाहरू।",
    logoUrl: "/placeholder-logo.png",
    order: 5,
  },
];

export async function getPartners(): Promise<Partner[]> {
  const partners: Partner[] = [];
  let order = 0;

  for (const contentSlug of CATEGORY_CONTENT_SLUGS) {
    const list = await fetchDcmContentList(contentSlug);
    // A content that exists but isn't content_type "list" (e.g. created as
    // "single" by mistake) has no `items` field at all — skip it rather
    // than crash, same as "doesn't exist yet".
    if (!list?.items || list.items.length === 0) continue;

    const categoryEn = list.content.eng_name || list.content.name;
    const categoryNe = list.content.name;

    const items: DcmSubContentDetail[] = await Promise.all(
      list.items.map(async (item) => {
        const detail = await fetchDcmSubContent(contentSlug, item.slug);
        return detail?.item ?? item;
      })
    );

    for (const item of items) {
      const file = item.files?.[0];
      partners.push({
        id: item.id,
        name_en: item.eng_name || item.name,
        name_ne: item.name,
        category_en: categoryEn,
        category_ne: categoryNe,
        description_en: item.eng_description || item.description || "",
        description_ne: item.description || "",
        logoUrl: file?.file_url || "/placeholder-logo.png",
        order: order++,
      });
    }
  }

  return partners.length > 0 ? partners : FALLBACK_PARTNERS;
}
