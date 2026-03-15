"use client";

import { useEffect, useState } from "react";
import type { GalleryRecord } from "@/lib/admin-types";
import { readGallery } from "@/lib/firebase/public-read";
import { GalleryFeed } from "@/components/public/gallery-feed";

export function GalleryFeedLoader() {
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const records = await readGallery();
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
    return <p className="text-sm text-slate-600">Loading gallery...</p>;
  }

  return <GalleryFeed items={items} />;
}
