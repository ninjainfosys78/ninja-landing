import PartnersClient from "@/components/partners-client";
import { getPartners } from "@/lib/partners";

export default async function PartnersPage() {
  const partners = await getPartners();
  return <PartnersClient partners={partners} />;
}
