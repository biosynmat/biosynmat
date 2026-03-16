"use client";

import { useEffect, useMemo, useState } from "react";
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
        setItems(records);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [limitCount]);

  const visibleItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    return items;
  }, [items]);

  const marqueeItems = useMemo(() => [...visibleItems, ...visibleItems], [visibleItems]);

  const durationSeconds = Math.max(visibleItems.length * 4, limitCount * 4, 14);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading publications...</p>;
  }

  if (visibleItems.length === 0) {
    return <p className="text-sm text-slate-600">No publications added yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl">
      <div
        className="marquee-track flex w-max gap-4"
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {marqueeItems.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="w-[280px] shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white sm:w-[320px] lg:w-[360px]"
          >
            <div className={`mb-3 h-2 rounded-full bg-gradient-to-r ${item.coverTone}`} aria-hidden />
            <h3 className="text-lg font-semibold leading-tight text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{item.authors}</p>
            <p className="mt-1 text-sm text-slate-600">{item.venue ? `${item.venue} - ${item.year}` : String(item.year)}</p>
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
      <style jsx>{`
        .marquee-track {
          animation: marquee-left var(--marquee-duration) linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
