import "server-only";
import { fetchDcmContentList, fetchDcmSubContent, type DcmSubContentDetail } from "@/lib/dcm-client";
import { PRODUCT_SOURCES } from "@/components/work/products/product-items";
import type { ProductSource } from "@/components/work/products/product-types";

// Each product's DCM sub-content lives as one item under this "list" content,
// inside the tenant's single DCM category (env.DCM_CATEGORY_SLUG). A
// sub-content's slug must match the corresponding ProductSource.id
// ("eshasan", "digital-epalika", "airfone") for its override to apply.
const CONTENT_SLUG = "projects";

/**
 * Overrides name/description/image on the static PRODUCT_SOURCES with
 * matching DCM sub-content, when present. DCM's generic content schema has
 * no fields for tagline/overview/highlights/stats/tags/siteUrl/accent, so
 * those stay hand-authored in components/work/products/sources/*.ts.
 * Falls back to the static sources untouched if DCM has nothing yet.
 */
export async function getProductSources(): Promise<ProductSource[]> {
  const list = await fetchDcmContentList(CONTENT_SLUG);
  if (!list?.items || list.items.length === 0) return PRODUCT_SOURCES;

  const items: DcmSubContentDetail[] = await Promise.all(
    list.items.map(async (item) => {
      const detail = await fetchDcmSubContent(CONTENT_SLUG, item.slug);
      return detail?.item ?? item;
    })
  );

  return PRODUCT_SOURCES.map((source) => {
    const match = items.find((item) => item.slug === source.id);
    if (!match) return source;

    const file = match.files?.[0];

    return {
      ...source,
      name: match.eng_name || match.name || source.name,
      description: {
        en: match.eng_description || source.description.en,
        ne: match.description || source.description.ne,
      },
      image: file?.file_url || source.image,
    };
  });
}
