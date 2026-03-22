import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { researchSchemes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research at BioSynMat Lab on synthetic protocells, cell-to-cell communication, and colloidosome-inspired compartment systems.",
  keywords: [
    "protocells research",
    "colloidosome research",
    "SRM research",
    "research group SRM",
    "BioSynMat Lab",
  ],
  alternates: {
    canonical: "/research",
  },
};

export default function ResearchPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        title="Research"
        description="Our research program investigates how synthetic protocells can model natural cellular behavior and scale toward higher-order tissue-like systems."
      />

      <div className="grid gap-6">
        {researchSchemes.map((scheme) => (
          <SectionCard key={scheme.id}>
            <h2 className="text-2xl font-semibold text-slate-900">{scheme.title}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{scheme.summary}</p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <Image
                src={scheme.image}
                alt={`${scheme.title} diagram`}
                width={1400}
                height={850}
                className="mx-auto h-auto w-full max-w-3xl rounded-xl object-contain"
              />
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
