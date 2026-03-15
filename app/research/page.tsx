import type { Metadata } from "next";
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
        {researchSchemes.map((scheme, index) => (
          <section key={scheme.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-teal-800">Scheme {index + 1}</p>
            <h2 className="text-2xl font-semibold text-slate-900">{scheme.title}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{scheme.summary}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {scheme.highlights.map((highlight) => (
                <li key={highlight} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
