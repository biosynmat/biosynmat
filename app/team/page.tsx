import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionCard } from "@/components/ui/section-card";
import { SocialLinks } from "@/components/ui/social-links";
import { TeamMembersGrid } from "@/components/public/team-members-grid";
import { piDetails } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the BioSynMat team and principal investigator Dr. Ananya Mishra at SRM Institute of Science and Technology.",
  keywords: [
    "Ananya Mishra",
    "Ananya Mishra SRM",
    "BioSynMat team",
    "research group SRM",
  ],
  alternates: {
    canonical: "/team",
  },
};

export default function TeamPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="mb-6 text-4xl font-semibold text-slate-900">Team</h1>

      <SectionCard className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-teal-800">
          Principal Investigator
        </p>
        <div className="grid gap-6 sm:grid-cols-[240px_1fr] sm:items-center">
          <Image
            src={piDetails.image}
            alt={`Portrait of ${piDetails.name}`}
            width={240}
            height={280}
            className="w-full max-w-[240px] rounded-2xl border border-slate-200 bg-slate-50 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {piDetails.name}
            </h2>
            <p className="mt-1 text-slate-600">{piDetails.title}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <SocialLinks
                name={piDetails.name}
                linkedin={piDetails.linkedin}
                researchgate={piDetails.researchgate}
                orcid={piDetails.orcid}
                webofscience={piDetails.webofscience}
                scopus={piDetails.scopus}
              />
              <Link
                href="/meet-ananya-mishra"
                className="teal-link inline-flex items-center rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold transition hover:bg-teal-800"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-teal-800">
          Team
        </p>
        <TeamMembersGrid />
      </SectionCard>
    </div>
  );
}
