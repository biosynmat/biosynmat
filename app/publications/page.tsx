import type { Metadata } from "next";
import { PublicationsFeed } from "@/components/public/publications-feed";

export const metadata: Metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-slate-900">Publications</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          Explore selected publications from the BioSynMat group and access publication links directly.
        </p>
      </div>

      <PublicationsFeed />
    </div>
  );
}
