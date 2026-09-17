import pb from "@/lib/pocketbase";

export type SolutionCard = {
  id: string;
  title_en: string;
  title_ne: string;
  description_en: string;
  description_ne: string;
  imageUrl: string | null;
};

type SolutionRecord = {
  id: string;
  Title_en: string;
  Title_ne: string;
  Description_en: string;
  Description_ne: string;
  Image?: string;
};

const FALLBACK_SOLUTIONS: SolutionCard[] = [
  {
    id: "fb-gov",
    title_en: "Government & Municipality",
    title_ne: "सरकार तथा नगरपालिका",
    description_en: "Digital governance solutions for modern civic services and municipal management.",
    description_ne: "आधुनिक नागरिक सेवा र नगरपालिका व्यवस्थापनको लागि डिजिटल सुशासन समाधान।",
    imageUrl: "/insights.jpg",
  },
  {
    id: "fb-edu",
    title_en: "Education",
    title_ne: "शिक्षा",
    description_en: "Smart learning management systems and institutional automation tools.",
    description_ne: "स्मार्ट लर्निङ म्यानेजमेन्ट सिस्टम र संस्थागत स्वचालन उपकरणहरू।",
    imageUrl: "/insights.jpg",
  },
  {
    id: "fb-health",
    title_en: "Healthcare",
    title_ne: "स्वास्थ्य",
    description_en: "Integrated hospital management and telehealth platforms.",
    description_ne: "एकीकृत अस्पताल व्यवस्थापन र टेलिहेल्थ प्लेटफर्महरू।",
    imageUrl: "/insights.jpg",
  },
  {
    id: "fb-fin",
    title_en: "Fintech",
    title_ne: "फिनटेक",
    description_en: "Secure payment gateways and digital banking infrastructures.",
    description_ne: "सुरक्षित भुक्तानी गेटवे र डिजिटल बैंकिङ पूर्वाधारहरू।",
    imageUrl: "/insights.jpg",
  },
  {
    id: "fb-corp",
    title_en: "Corporate Solutions",
    title_ne: "कर्पोरेट समाधान",
    description_en: "Enterprise resource planning and custom business workflow automation.",
    description_ne: "इन्टरप्राइज रिसोर्स प्लानिङ र अनुकूलन व्यवसाय कार्यप्रवाह स्वचालन।",
    imageUrl: "/insights.jpg",
  },
  {
    id: "fb-telecom",
    title_en: "Telecom",
    title_ne: "टेलिकम",
    description_en: "Network infrastructure and service platforms for modern telecommunications providers.",
    description_ne: "आधुनिक दूरसञ्चार प्रदायकहरूको लागि नेटवर्क पूर्वाधार र सेवा प्लेटफर्महरू।",
    imageUrl: "/insights.jpg",
  },
];

export async function getSolutionsCards(): Promise<SolutionCard[]> {
  try {
    const records = await pb
      .collection("NinjaLanding_Solutions")
      .getFullList<SolutionRecord>({
        sort: "created",
      });

    if (records.length === 0) return FALLBACK_SOLUTIONS;

    return records.map((record) => ({
      id: record.id,
      title_en: record.Title_en,
      title_ne: record.Title_ne,
      description_en: record.Description_en,
      description_ne: record.Description_ne,
      imageUrl: record.Image ? pb.files.getURL(record, record.Image) : "/insights.jpg",
    }));
  } catch (e) {
    console.error("Error fetching solutions cards:", e);
    return FALLBACK_SOLUTIONS;
  }
}

export async function getSolutionById(id: string): Promise<SolutionCard | null> {
  try {
    const record = await pb.collection("NinjaLanding_Solutions").getOne<SolutionRecord>(id);

    return {
      id: record.id,
      title_en: record.Title_en,
      title_ne: record.Title_ne,
      description_en: record.Description_en,
      description_ne: record.Description_ne,
      imageUrl: record.Image ? pb.files.getURL(record, record.Image) : "/insights.jpg",
    };
  } catch (e) {
    console.error(`Error fetching solution with id ${id}:`, e);
    return FALLBACK_SOLUTIONS.find((s) => s.id === id) || null;
  }
}

