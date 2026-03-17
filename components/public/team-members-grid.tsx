"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import type { TeamMemberRecord } from "@/lib/admin-types";
import { readTeamMembers } from "@/lib/firebase/public-read";
import { teamMembers } from "@/lib/site-data";
import { normalizeExternalUrl } from "@/lib/utils";

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
  const [items, setItems] = useState<TeamMemberRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const records = await readTeamMembers();
        setItems(records.length > 0 ? records : fallbackMembers());
      } catch {
        setItems(fallbackMembers());
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading team members...</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((member) => {
        const linkedinUrl = normalizeExternalUrl(member.linkedin);
        const researchgateUrl = normalizeExternalUrl(member.researchgate);
        const orcidUrl = normalizeExternalUrl(member.orcid);

        return (
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
            <div className="mt-2 flex items-center gap-1.5">
              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              ) : null}
              {researchgateUrl ? (
                <a
                  href={researchgateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} ResearchGate`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold text-white transition hover:bg-white/15"
                >
                  RG
                  <span className="sr-only">ResearchGate</span>
                </a>
              ) : null}
              {orcidUrl ? (
                <a
                  href={orcidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} ORCID`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold text-white transition hover:bg-white/15"
                >
                  iD
                  <span className="sr-only">ORCID</span>
                </a>
              ) : null}
            </div>
          </div>
        </article>
        );
      })}
    </div>
  );
}
