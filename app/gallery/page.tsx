import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { GalleryFeedLoader } from "@/components/public/gallery-feed-loader";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        title="Gallery"
        description="Latest images from BioSynMat lab activities, research snapshots, and academic events."
      />
      <GalleryFeedLoader />
    </div>
  );
}
