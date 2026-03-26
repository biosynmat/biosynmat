import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import { PublicationsFeed } from "@/components/public/publications-feed";
import { piDetails } from "@/lib/site-data";
import { normalizeExternalUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Meet Ananya Mishra",
  description:
    "Profile of Dr. Ananya Mishra at BioSynMat Lab, SRM Institute of Science and Technology, with research highlights and publications.",
  keywords: [
    "Ananya Mishra",
    "Ananya Mishra SRM",
    "Ananya Mishra SRM professor",
    "Ananya Mishra Google Scholar",
    "BioSynMat",
    "BioSynMat Lab",
  ],
  alternates: {
    canonical: "/meet-ananya-mishra",
  },
};

export default function MeetPiPage() {
  const piLinkedin = normalizeExternalUrl(piDetails.linkedin);
  const piResearchGate = normalizeExternalUrl(piDetails.researchgate);
  const piOrcid = normalizeExternalUrl(piDetails.orcid);
  const piWebOfScience = normalizeExternalUrl(piDetails.webofscience);
  const piScopus = normalizeExternalUrl(piDetails.scopus);

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-teal-800">
          Meet the Principal Investigator
        </p>
        <h1 className="mb-8 text-4xl font-semibold text-slate-900">
          {piDetails.name}
        </h1>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <Image
              src={piDetails.image}
              alt={`Portrait of ${piDetails.name}`}
              width={320}
              height={380}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 object-cover"
            />
            <p className="mt-4 text-sm font-semibold text-slate-900">
              {piDetails.title.replace("Assistant Professor", "Research Assistant Professor")}
            </p>
            <p className="mt-1 text-sm text-slate-600">{piDetails.office}</p>
            <a
              href={`mailto:${piDetails.email}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-600 underline decoration-slate-300 underline-offset-4"
            >
              <Mail className="h-3.5 w-3.5" />
              {piDetails.email}
            </a>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href={piLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                LinkedIn
              </a>
              {piResearchGate ? (
                <a
                  href={piResearchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  ResearchGate
                </a>
              ) : null}
              {piOrcid ? (
                <a
                  href={piOrcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  ORCID
                </a>
              ) : null}
              {piWebOfScience ? (
                <a
                  href={piWebOfScience}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Web of Science
                </a>
              ) : null}
              {piScopus ? (
                <a
                  href={piScopus}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Scopus
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <div className="space-y-4 text-slate-700">
              {piDetails.bio.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-semibold text-slate-900">
              Achievements, Fellowship and Awards
            </h2>
            <ul className="mt-4 space-y-3">
              {piDetails.achievements.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* <h2 className="mt-8 text-2xl font-semibold text-slate-900">
              Research Interests
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {piDetails.researchInterests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
                >
                  {interest}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>

      <section id="publications" className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-3xl font-semibold text-slate-900">Publications</h2>
        <p className="mt-2 text-slate-700">
          Explore selected publications by Dr. Ananya Mishra and access publication links directly.
        </p>
        <div className="mt-6">
          <PublicationsFeed />
        </div>
      </section>
    </div>
  );
}
