import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PublicationsFeed } from "@/components/public/publications-feed";

export const metadata: Metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        title="Publications"
        description="Explore selected publications from the BioSynMat group and access publication links directly."
      />
      <PublicationsFeed />
    </div>
  );
}
