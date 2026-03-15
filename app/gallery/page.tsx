import type { Metadata } from "next";
import { GalleryFeedLoader } from "@/components/public/gallery-feed-loader";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-slate-900">Gallery</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          Latest images from BioSynMat lab activities, research snapshots, and academic events.
        </p>
      </div>

      <GalleryFeedLoader />
    </div>
  );
}
