import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { NewsFeed } from "@/components/public/news-feed";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest updates, announcements, and research news from BioSynMat Lab at SRM.",
  keywords: ["BioSynMat news", "SRM research updates", "Ananya Mishra lab news"],
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        title="News"
        description="Latest updates from BioSynMat."
        icon={Newspaper}
      />
      <NewsFeed />
    </div>
  );
}
