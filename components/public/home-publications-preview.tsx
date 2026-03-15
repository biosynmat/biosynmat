"use client";

import { useEffect, useState } from "react";
import type { PublicationRecord } from "@/lib/admin-types";
import { readPublications } from "@/lib/firebase/public-read";

type HomePublicationsPreviewProps = {
  limitCount?: number;
};

export function HomePublicationsPreview({ limitCount = 3 }: HomePublicationsPreviewProps) {
  const [items, setItems] = useState<PublicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const records = await readPublications();
        setItems(records.slice(0, limitCount));
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [limitCount]);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading publications...</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-600">No publications added yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
        >
          <div className={`mb-3 h-2 rounded-full bg-gradient-to-r ${item.coverTone}`} aria-hidden />
          <h3 className="text-lg font-semibold leading-tight text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{item.authors}</p>
          <p className="mt-1 text-sm text-slate-600">{item.venue ? `${item.venue} • ${item.year}` : String(item.year)}</p>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
            >
              Read Publication
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
