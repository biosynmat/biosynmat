import type { Metadata } from "next";
import Image from "next/image";
import { researchSchemes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-slate-900">Research</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          Our research program investigates how synthetic protocells can model natural cellular behavior and scale toward higher-order tissue-like systems.
        </p>
      </div>

      <div className="grid gap-6">
        {researchSchemes.map((scheme) => (
          <section key={scheme.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
          </section>
        ))}
      </div>
    </div>
  );
}
