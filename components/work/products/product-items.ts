import { AIRFONE_SOURCE } from "./sources/airfone";
import { DIGITAL_PALIKA_SOURCE } from "./sources/digital-palika";
import { ESHASAN_SOURCE } from "./sources/eshasan";
import type { ProductItem, ProductLang, ProductSource } from "./product-types";

export type { ProductItem, ProductLang, ProductSource } from "./product-types";

// The static, hand-authored facts about each product (tagline, highlights,
// stats, site URL, accent color) — DCM has no fields for these, so they
// never come from the CMS. getProductSources() (lib/products.ts) overrides
// just name/description/image on top of this when a matching DCM sub-content
// item exists.
export const PRODUCT_SOURCES: ProductSource[] = [ESHASAN_SOURCE, DIGITAL_PALIKA_SOURCE, AIRFONE_SOURCE];

export function getProducts(language: ProductLang, sources: ProductSource[] = PRODUCT_SOURCES): ProductItem[] {
  return sources.map(({ tagline, description, overview, highlights, stats, tags, ...rest }) => ({
    ...rest,
    tagline: tagline[language],
    description: description[language],
    overview: overview[language],
    highlights: highlights[language],
    stats: stats.map((stat) => ({ value: stat.value, label: stat.label[language] })),
    tags: tags[language],
  }));
}
