import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { NewsFeed } from "@/components/public/news-feed";

export const metadata: Metadata = {
  title: "News",
};

export default function NewsPage() {
  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="inline-flex items-center gap-2 text-4xl font-semibold text-slate-900">
          <Newspaper className="h-8 w-8 text-teal-700" />
          News
        </h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          Latest updates from BioSynMat.
        </p>
      </div>

      <NewsFeed />
    </div>
  );
}
