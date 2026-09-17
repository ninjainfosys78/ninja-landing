import pb from "@/lib/pocketbase"

export type TestimonialRecord = {
  nameEn: string
  nameNe: string
  quoteEn: string
  quoteNe: string
  image?: string
}

const TESTIMONIALS_COLLECTION = "NinjaLanding_Testimonials"

// Placeholder data shown until the CMS collection is reachable/populated.
export const DUMMY_TESTIMONIALS: TestimonialRecord[] = [
  {
    nameEn: "Rajendra Shrestha",
    nameNe: "राजेन्द्र श्रेष्ठ",
    quoteEn:
      "Ninja Infosys delivered our government portal on time and it has run reliably ever since. Their team understood our compliance needs from day one.",
    quoteNe:
      "निन्जा इन्फोसिसले हाम्रो सरकारी पोर्टल समयमै डेलिभर गर्यो र त्यसयता भरपर्दो रूपमा चलिरहेको छ।",
  },
  {
    nameEn: "Anita Gurung",
    nameNe: "अनिता गुरुङ",
    quoteEn:
      "Professional, responsive, and genuinely invested in our success. The custom software they built scaled with us without a single hiccup.",
    quoteNe:
      "व्यावसायिक, प्रतिक्रियाशील, र हाम्रो सफलतामा साँच्चै लगानी गरिएको। तिनीहरूले बनाएको कस्टम सफ्टवेयर हामीसँगै विस्तार भयो।",
  },
  {
    nameEn: "Bikash Thapa",
    nameNe: "बिकाश थापा",
    quoteEn:
      "From consultancy to deployment, Ninja Infosys felt like an extension of our own engineering team — clear communication at every stage.",
    quoteNe:
      "परामर्शदेखि डेप्लोइमेन्टसम्म, निन्जा इन्फोसिस हाम्रै इन्जिनियरिङ टोलीको विस्तार जस्तो महसुस भयो।",
  },
]

export async function fetchTestimonials(): Promise<TestimonialRecord[]> {
  try {
    const records: any[] = await pb
      .collection(TESTIMONIALS_COLLECTION)
      .getFullList({ sort: "-created" })

    const list = records.map((r: any) => {
      const nameEn: string = r.Name_EN ?? ""
      const nameNe: string = r.Name_NE ?? ""
      const quoteEn: string = r.Quote_en ?? ""
      const quoteNe: string = r.Quote_ne ?? ""
      const fileField = r.Image ?? r.image
      const image = fileField ? pb.files.getURL(r, fileField) : undefined

      return {
        nameEn,
        nameNe,
        quoteEn,
        quoteNe,
        image,
      }
    })

    return list.length > 0 ? list : DUMMY_TESTIMONIALS
  } catch (e) {
    console.error("Error fetching testimonials:", e)
    return DUMMY_TESTIMONIALS
  }
}
