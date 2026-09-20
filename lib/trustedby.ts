import { fetchDcmContentList, fetchDcmSubContent } from "@/lib/dcm-client";

// The "Trusted by leading organizations" logos are authored as sub-content
// items (one per organization, each with a logo file) under this DCM
// content slug, inside the tenant's single DCM category (env.DCM_CATEGORY_SLUG).
const CONTENT_SLUG = "leading-organization";

export interface TrustedLogoRecord {
  id: string;
  logo: string;
  logoName: string;
}

// Placeholder data shown until the CMS collection is reachable/populated.
export const DUMMY_TRUSTED_LOGOS: TrustedLogoRecord[] = [
  { id: "dummy-1", logo: "", logoName: "Acme Group" },
  { id: "dummy-2", logo: "", logoName: "Nova Systems" },
  { id: "dummy-3", logo: "", logoName: "Verta Bank" },
  { id: "dummy-4", logo: "", logoName: "Skyline Holdings" },
  { id: "dummy-5", logo: "", logoName: "Meridian Corp" },
  { id: "dummy-6", logo: "", logoName: "Apex Ventures" },
  { id: "dummy-7", logo: "", logoName: "Bluewave Tech" },
  { id: "dummy-8", logo: "", logoName: "Northline Industries" },
];

export async function fetchTrustedLogos(): Promise<TrustedLogoRecord[]> {
  const list = await fetchDcmContentList(CONTENT_SLUG);
  const items = list?.items ?? [];
  if (items.length === 0) return DUMMY_TRUSTED_LOGOS;

  const logos = await Promise.all(
    items.map(async (item) => {
      const detail = await fetchDcmSubContent(CONTENT_SLUG, item.slug);
      const file = detail?.item?.files?.[0];
      if (!file) return null;
      return {
        id: item.id,
        logo: file.file_url,
        logoName: item.eng_name || item.name,
      };
    })
  );

  const resolved = logos.filter((x): x is TrustedLogoRecord => x !== null);
  return resolved.length > 0 ? resolved : DUMMY_TRUSTED_LOGOS;
}
