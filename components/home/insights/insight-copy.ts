export interface InsightCopy {
  title: string;
  description: string;
  viewAll: string;
  readArticle: string;
  featured: string;
}

const COPY: Record<"en" | "ne", InsightCopy> = {
  en: {
    title: "Blogs",
    description: "Ideas, engineering notes and lessons from the people building your systems.",
    viewAll: "View all blogs",
    readArticle: "Read article",
    featured: "Featured",
  },
  ne: {
    title: "ब्लगहरू",
    description: "तपाईंका प्रणाली बनाउने टोलीका विचार, इन्जिनियरिङ नोट र सिकाइहरू।",
    viewAll: "सबै ब्लगहरू हेर्नुहोस्",
    readArticle: "लेख पढ्नुहोस्",
    featured: "विशेष",
  },
};

export const getInsightCopy = (language: "en" | "ne"): InsightCopy => COPY[language];
