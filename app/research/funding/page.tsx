import type { Metadata } from "next";
import Link from "next/link";
import { Landmark } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Research Funding",
  description:
    "Research grants and fellowships received by BioSynMat Lab for advancing bioinspired materials and protocell research.",
  keywords: ["BioSynMat funding", "research grants", "INSPIRE Faculty Fellowship", "GYTI", "MSCA"],
  alternates: {
    canonical: "/research/funding",
  },
};

const fundingItems = [
  {
    title: "INSPIRE Faculty Fellowship Scheme (2025-2030)",
    amount: "\u20B9 35,00,000 research grant",
    duration: "5 years",
    details:
      "Research Title - Programmable compartmentalization for cell free synthetic biology and biocomputing",
  },
  {
    title:
      "Marie Sklodowska Curie (MSC)-Individual Fellowship granted by MSCA European Commission (2021-2023)",
    amount: "\u00A3 2,24,933.76 research grant",
    duration: "2 years",
    details:
      "Research title - Programmed Protocells",
  },
  {
    title:
      "Gandhian Young Technological Innovation Award (GYTI) funded by Biotechnology Industry Research Assistance Council (BIRAC) - Society for Research and Initiatives for Sustainable Technologies and Institutions (SRISTI) (2019)",
    amount: "\u20B9 15,00,000 research grant",
    duration: "2 years",
    details:
      "Research Title - Actin Mimetic ATP Driven Controlled Supramolecular Polymerization",
  },
] as const;

export default function ResearchFundingPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        title="Funding"
        description="Explore the major grants and fellowships that currently support research in the BioSynMat Lab."
        icon={Landmark}
      />

      <div className="mb-6">
        <Link
          href="/research"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to Research
        </Link>
      </div>

      <div className="space-y-5">
        {fundingItems.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
                {item.amount}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {item.duration}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{item.details}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
