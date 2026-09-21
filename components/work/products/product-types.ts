export type ProductLang = "en" | "ne";

export interface LocalizedText {
  en: string;
  ne: string;
}

export interface LocalizedList {
  en: string[];
  ne: string[];
}

export interface ProductStat {
  value: string;
  label: LocalizedText;
}

export interface ProductSource {
  id: string;
  name: string;
  siteUrl: string;
  tagline: LocalizedText;
  description: LocalizedText;
  overview: LocalizedText;
  highlights: LocalizedList;
  stats: ProductStat[];
  tags: LocalizedList;
  image: string;
  accent: string;
}

export interface ProductItem {
  id: string;
  name: string;
  siteUrl: string;
  tagline: string;
  description: string;
  overview: string;
  highlights: string[];
  stats: { value: string; label: string }[];
  tags: string[];
  image: string;
  accent: string;
}
