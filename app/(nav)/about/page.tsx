import AboutClient from "@/components/about-client";
import { getTeamMembers, getTeamGridMembers } from "@/lib/team";

export default async function AboutPage() {
  const [teamMembers, teamGridMembers] = await Promise.all([
    getTeamMembers(),
    getTeamGridMembers(),
  ]);
  return <AboutClient teamMembers={teamMembers} teamGridMembers={teamGridMembers} />;
}
