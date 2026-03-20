import type { Metadata } from "next";
import { GroupPublicationsFeed } from "@/components/public/group-publications-feed";
import { PageHeader } from "@/components/ui/page-header";

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
      <GroupPublicationsFeed />
    </div>
  );
}
