import type { Metadata } from "next";
import Link from "next/link";
import { HomePublicationsPreview } from "@/components/public/home-publications-preview";
import { NewsFeed } from "@/components/public/news-feed";

export const metadata: Metadata = {
  title: "BioSynMat",
  description:
    "BioSynMat Lab at SRM explores synthetic biomaterials, protocells, and colloidosome-inspired systems for next-generation bioinspired research.",
  keywords: [
    "BioSynMat",
    "BioSynMat Lab",
    "SRM research",
    "protocells research",
    "colloidosome research",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="py-10 px-5 sm:py-14">
      <section>
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              About us
            </p>
            <h1 className="mb-5 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Dr. Ananya Mishra&apos;s BioSynMat Lab
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-700">
              Our Research is dedicated to creating bioinspired synthetic
              materials that emulate the structure, dynamics and functionality
              of living systems. Our work bridges chemistry, materials science
              and biology to understand and engineer protocells as minimal
              models of life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/meet-ananya-mishra"
                className="teal-link inline-flex items-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold transition hover:bg-teal-800"
              >
                Meet the PI
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Research
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Research Focus
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
              <li className="rounded-xl bg-white p-3">
                Construction of programmable protocells
              </li>
              <li className="rounded-xl bg-white p-3">
                Synthetic cell-to-cell communications in protocell populations
              </li>
              <li className="rounded-xl bg-white p-3">
                Hierarchical organization from protocells to prototissues
              </li>
              <li className="rounded-xl bg-white p-3">
                Convergence of supramolecular self-assembly and protocell
                biochemistry
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12  sm:mt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-teal-800">
                Publications
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Dr Mishra&apos;s Publications
              </h2>
            </div>
            <Link
              href="/meet-ananya-mishra#publications"
              className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
            >
              View All Publications
            </Link>
          </div>

          <HomePublicationsPreview limitCount={3} />
        </div>
      </section>

      <section className=" mt-12 sm:mt-16 ">
        <div className="rounded-3xl border border-teal-100 bg-teal-50 p-6 sm:p-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Join the BioSynMat team
          </h2>
          <p className="max-w-3xl text-slate-700">
            We welcome motivated students and scholars who want to work on
            protocells, bioinspired materials and supramolecular self assembly.
          </p>
          <Link
            href="/opportunities"
            className="teal-link mt-6 inline-flex items-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold transition hover:bg-teal-800"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">
              Latest News
            </h2>
            <Link
              href="/news"
              className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
            >
              View All News
            </Link>
          </div>
          <NewsFeed limitCount={3} />
        </div>
      </section>
    </div>
  );
}
