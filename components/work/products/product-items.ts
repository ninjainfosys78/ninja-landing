import { AIRFONE_SOURCE } from "./sources/airfone";
import { DIGITAL_PALIKA_SOURCE } from "./sources/digital-palika";
import { ESHASAN_SOURCE } from "./sources/eshasan";
import type { ProductItem, ProductLang, ProductSource } from "./product-types";

export type { ProductItem, ProductLang } from "./product-types";

const PRODUCT_SOURCES: ProductSource[] = [ESHASAN_SOURCE, DIGITAL_PALIKA_SOURCE, AIRFONE_SOURCE];

export function getProducts(language: ProductLang): ProductItem[] {
  return PRODUCT_SOURCES.map(({ tagline, description, overview, highlights, stats, tags, ...rest }) => ({
    ...rest,
    tagline: tagline[language],
    description: description[language],
    overview: overview[language],
    highlights: highlights[language],
    stats: stats.map((stat) => ({ value: stat.value, label: stat.label[language] })),
    tags: tags[language],
  }));
}
