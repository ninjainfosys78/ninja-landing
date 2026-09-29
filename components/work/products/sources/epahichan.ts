import type { ProductSource } from "../product-types";

export const EPAHICHAN_SOURCE: ProductSource = {
  id: "epahichan",
  name: "ePahichan",
  siteUrl: "https://epahichan.com/",
  tagline: { en: "One digital signature, for every Nepali", ne: "हरेक नेपालीका लागि एउटा डिजिटल हस्ताक्षर" },
  description: {
    en: "A digital signature platform that makes cryptographic document signing accessible to ordinary Nepali citizens.",
    ne: "साधारण नेपाली नागरिकका लागि क्रिप्टोग्राफिक कागजात हस्ताक्षर सुलभ बनाउने डिजिटल हस्ताक्षर प्लेटफर्म।",
  },
  overview: {
    en: "ePahichan lets people sign documents electronically in line with Nepal's Electronic Transactions Act, 2063. Signing happens in the browser, and any signature can be verified independently using only the document and the signatory's public key, without relying on ePahichan servers.",
    ne: "ईपहिचानले विद्युतीय कारोबार ऐन, २०६३ अनुसार कागजातमा विद्युतीय हस्ताक्षर गर्न दिन्छ। हस्ताक्षर ब्राउजरमै हुन्छ, र कागजात तथा हस्ताक्षरकर्ताको सार्वजनिक कुञ्जी मात्र प्रयोग गरेर ईपहिचानका सर्भरमा भर नपरी जुनसुकै हस्ताक्षर स्वतन्त्र रूपमा प्रमाणित गर्न सकिन्छ।",
  },
  highlights: {
    en: [
      "Legally recognized digital signatures in Nepal",
      "Browser-based signing, with verification that doesn't depend on ePahichan servers",
      "Cryptographically secure signatures that cannot be forged without the private key",
      "Detects any tampering with a document after signing",
    ],
    ne: [
      "नेपालमा कानुनी मान्यता प्राप्त डिजिटल हस्ताक्षर",
      "ब्राउजरमै हस्ताक्षर, ईपहिचानका सर्भरमा निर्भर नहुने प्रमाणीकरण",
      "निजी कुञ्जीबिना नक्कली बनाउन नसकिने क्रिप्टोग्राफिक रूपमा सुरक्षित हस्ताक्षर",
      "हस्ताक्षरपछि कागजातमा भएको जुनसुकै हेरफेर पत्ता लगाउने",
    ],
  },
  stats: [],
  tags: { en: ["Digital Signature", "Security", "Legal Tech"], ne: ["डिजिटल हस्ताक्षर", "सुरक्षा", "कानुनी प्रविधि"] },
  image: "/epahichan-visual.png",
  imageFit: "contain",
  accent: "#C8102E",
};
