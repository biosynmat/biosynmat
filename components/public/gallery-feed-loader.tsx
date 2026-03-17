"use client";

import { useQuery } from "@tanstack/react-query";
import { readGallery } from "@/lib/firebase/public-read";
import { GalleryFeed } from "@/components/public/gallery-feed";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { queryKeys } from "@/lib/query-keys";

export function GalleryFeedLoader() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: queryKeys.gallery,
    queryFn: readGallery,
  });

  if (isLoading) {
    return <LoadingIndicator label="Loading gallery..." />;
  }

  return <GalleryFeed items={items} />;
}
