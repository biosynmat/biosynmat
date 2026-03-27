"use client";

import { useQuery } from "@tanstack/react-query";
import { PublicationGrid } from "@/components/public/publication-grid";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { EmptyState } from "@/components/ui/empty-state";
import { readPublications } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";

export function PublicationsFeed() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: queryKeys.publications,
    queryFn: readPublications,
  });

  if (isLoading) {
    return <LoadingIndicator label="Loading publications..." />;
  }

  if (items.length === 0) {
    return <EmptyState message="Stay tuned..." />;
  }

  return <PublicationGrid items={items} />;
}
