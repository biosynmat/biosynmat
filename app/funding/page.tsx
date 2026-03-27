import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Funding",
  description:
    "Research grants and fellowships received by BioSynMat Lab for advancing bioinspired materials and protocell research.",
  keywords: ["BioSynMat funding", "research grants", "INSPIRE Faculty Fellowship", "GYTI", "MSCA"],
  alternates: {
    canonical: "/funding",
  },
};

const fundingItems = [
  {
    title: "INSPIRE Faculty Fellowship Scheme",
    amount: "\u20B9 35,00,000 research grant",
    duration: "5 years",
    details:
      "Research grant of an amount of \u20B9 35,00,000 for a period of 5 years under INSPIRE Faculty Fellowship Scheme, along with a fellowship amount of \u20B9 1,25,000 per month, for carrying out research work on \"Programmable compartmentalization for cell free synthetic biology and biocomputing\".",
  },
  {
    title:
      "Biotechnology Industry Research Assistance Council - Society for Research and Initiatives for Sustainable Technologies and Institutions (GYTI 2019)",
    amount: "\u20B9 15,00,000 research grant",
    duration: "Awarded in 2019",
    details:
      "Research grant of an amount of \u20B9 15,00,000 awarded under the Gandhian Young Technological Innovation Award (GYTI), 2019 for the research work on \"Actin Mimetic ATP Driven Controlled Supramolecular Polymerization\" and the advancement of the field. This grant was awarded to a total of 15 winners from all over the country in the field of biotechnology.",
  },
  {
    title: "MSCA European Commission - MSCA-Individual Fellowship",
    amount: "GBP 2,24,933.76 research grant",
    duration: "2021-2023",
    details:
      "Research grant of an amount of GBP 2,24,933.76 awarded by MSCA European Commission under the MSCA-Individual Fellowship for the project titled \"Programmed Protocells\" (2021-2023).",
  },
] as const;

export default function FundingPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        title="Funding"
        description="Explore the major grants and fellowships that currently support research in the BioSynMat Lab."
        icon={Landmark}
      />

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
