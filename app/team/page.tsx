import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { TeamMembersGrid } from "@/components/public/team-members-grid";
import { piDetails } from "@/lib/site-data";
import { normalizeExternalUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  const piLinkedin = normalizeExternalUrl(piDetails.linkedin);
  const piResearchGate = normalizeExternalUrl(piDetails.researchgate);
  const piOrcid = normalizeExternalUrl(piDetails.orcid);

  return (
    <div className="section-shell py-10 sm:py-14">
      <h1 className="mb-6 text-4xl font-semibold text-slate-900">Team</h1>

      <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
              <a
                href={piLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${piDetails.name} LinkedIn`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              {piResearchGate ? (
                <a
                  href={piResearchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${piDetails.name} ResearchGate`}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-slate-300 bg-white px-2 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  RG
                  <span className="sr-only">ResearchGate</span>
                </a>
              ) : null}
              {piOrcid ? (
                <a
                  href={piOrcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${piDetails.name} ORCID`}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-slate-300 bg-white px-2 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  iD
                  <span className="sr-only">ORCID</span>
                </a>
              ) : null}
              <Link
                href="/meet-ananya-mishra"
                className="teal-link inline-flex items-center rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold transition hover:bg-teal-800"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-teal-800">
          Team
        </p>
        <TeamMembersGrid />
      </section>
    </div>
  );
}
