"use client";

import { useEffect, useState } from "react";
import { PublicationGrid } from "@/components/publication-grid";
import type { PublicationRecord } from "@/lib/admin-types";
import { readPublications } from "@/lib/firebase/public-read";

export function PublicationsFeed() {
  const [items, setItems] = useState<PublicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const records = await readPublications();
        setItems(records);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading publications...</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-600">No publications added yet.</p>;
  }

  return <PublicationGrid items={items} />;
}
