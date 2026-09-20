import TeamMarqueeTile from "./team-marquee-tile";
import type { TeamMemberView } from "./team-member-view";

interface TeamMarqueeRowProps {
  members: TeamMemberView[];
  reverse?: boolean;
}

const MIN_TILES_PER_HALF = 8;
const MARQUEE_SECONDS_PER_TILE = 4;

const repeatToFill = (members: TeamMemberView[]) =>
  Array.from({ length: Math.ceil(MIN_TILES_PER_HALF / members.length) }, () => members).flat();

/** Two identical halves so translating by -50% loops seamlessly. */
export default function TeamMarqueeRow({ members, reverse = false }: TeamMarqueeRowProps) {
  const half = repeatToFill(members);

  return (
    <div className="group/row overflow-hidden">
      <div
        className="flex w-max motion-reduce:!animate-none group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `marquee-left ${half.length * MARQUEE_SECONDS_PER_TILE}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1}>
            {half.map((member, idx) => (
              <TeamMarqueeTile key={`${member.name}-${idx}`} member={member} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
