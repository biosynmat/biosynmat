"use client";

import { useQuery } from "@tanstack/react-query";
import { PublicationGrid } from "@/components/public/publication-grid";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { EmptyState } from "@/components/ui/empty-state";
import { readGroupPublications } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";

export function GroupPublicationsFeed() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: queryKeys.groupPublications,
    queryFn: readGroupPublications,
  });

  if (isLoading) {
    return <LoadingIndicator label="Loading group publications..." />;
  }

  if (items.length === 0) {
    return <EmptyState message="Stay tuned..." />;
  }

  return <PublicationGrid items={items} />;
}
