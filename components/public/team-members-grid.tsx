"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import type { TeamMemberRecord } from "@/lib/admin-types";
import { readTeamMembers } from "@/lib/firebase/public-read";
import { teamMembers } from "@/lib/site-data";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { SocialLinks } from "@/components/ui/social-links";
import { queryKeys } from "@/lib/query-keys";

function fallbackMembers(): TeamMemberRecord[] {
  return teamMembers.map((member, index) => ({
    id: `fallback-${index}`,
    name: member.name,
    role: member.role,
    image: member.image,
    linkedin: member.linkedin ?? "",
    researchgate: member.researchgate ?? "",
    orcid: member.orcid ?? "",
  }));
}

export function TeamMembersGrid() {
  const { data: records = [], isLoading } = useQuery({
    queryKey: queryKeys.teamMembers,
    queryFn: readTeamMembers,
  });

  const items: TeamMemberRecord[] =
    records.length > 0 ? records : fallbackMembers();

  if (isLoading) {
    return <LoadingIndicator label="Loading team members..." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((member) => (
        <article
          key={member.id}
          className="group relative isolate aspect-[3/4] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm"
        >
          {member.image ? (
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              width={960}
              height={1280}
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/15 bg-black/50 px-5 py-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
            <h3 className="text-3xl font-semibold text-white">{member.name}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-white/75 sm:text-sm">{member.role}</p>
            <SocialLinks
              name={member.name}
              linkedin={member.linkedin}
              researchgate={member.researchgate}
              orcid={member.orcid}
              variant="light"
              className="mt-2"
            />
          </div>
        </article>
      ))}
    </div>
  );
}
