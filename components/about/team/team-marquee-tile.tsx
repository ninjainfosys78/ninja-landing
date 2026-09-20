import MemberPortrait from "./member-portrait";
import type { TeamMemberView } from "./team-member-view";

export default function TeamMarqueeTile({ member }: { member: TeamMemberView }) {
  return (
    <div className="group relative mx-2 aspect-[3/4] w-[42vw] shrink-0 overflow-hidden rounded-2xl bg-[#dbe8fd] shadow-[0_18px_40px_-22px_rgba(10,31,77,0.4)] sm:w-[22vw] lg:w-[13.5vw]">
      <MemberPortrait name={member.name} image={member.image} />
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-12 transition-transform duration-500 group-hover:translate-y-0">
        <p className="text-sm font-medium text-white">{member.name}</p>
        <p className="text-[11px] text-white/70">{member.role}</p>
      </div>
    </div>
  );
}
