import pb from "@/lib/pocketbase";

const TRUSTED_COLLECTION = "Ninja_trustedby";

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
  try {
    const records: any[] = await pb.collection(TRUSTED_COLLECTION).getFullList();

    const list = records
      .map((r: any) => {
        const file = r.Logo ?? r.logo ?? null;
        if (!file) return null;

        const name = (r.Logo_name ?? r.logo_name ?? r.name ?? "").toString().trim();

        return {
          id: r.id,
          logo: pb.files.getURL(r, file),
          logoName: name,
        };
      })
      .filter((x: TrustedLogoRecord | null): x is TrustedLogoRecord => x !== null);

    return list.length > 0 ? list : DUMMY_TRUSTED_LOGOS;
  } catch (e) {
    console.error("Error fetching trusted logos:", e);
    return DUMMY_TRUSTED_LOGOS;
  }
}
