import HomePageClient from "@/components/home-page-client"
import { getTopInsights } from "@/lib/insights"

export default async function Page() {
  const insights = await getTopInsights(3)

  return <HomePageClient insights={insights} />
}
