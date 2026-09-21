import AboutClient from "@/components/about-client";
import { getStoryMilestones } from "@/lib/story/fetch-story-milestones";
import { getTeamMembers, getTeamGridMembers } from "@/lib/team";

export default async function AboutPage() {
  const [teamMembers, teamGridMembers, storyMilestones] = await Promise.all([
    getTeamMembers(),
    getTeamGridMembers(),
    getStoryMilestones(),
  ]);
  return (
    <AboutClient
      teamMembers={teamMembers}
      teamGridMembers={teamGridMembers}
      storyMilestones={storyMilestones}
    />
  );
}
