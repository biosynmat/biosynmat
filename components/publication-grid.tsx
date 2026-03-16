"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PublicationRecord } from "@/lib/admin-types";

type PublicationGridProps = {
  items: PublicationRecord[];
};

export function PublicationGrid({ items }: PublicationGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPublication = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
          >
            <div
              className={`mb-3 h-2 rounded-full bg-gradient-to-r ${item.coverTone}`}
              aria-hidden
            />
            <h3 className="text-lg font-semibold leading-tight text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-700">{item.authors}</p>
            <p className="mt-1 text-sm text-slate-600">
              {item.venue ? `${item.venue} • ${item.year}` : String(item.year)}
            </p>
            <button
              type="button"
              onClick={() => setSelectedId(item.id)}
              className="mt-4 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View More
            </button>
          </article>
        ))}
      </div>

      <Dialog
        open={Boolean(selectedPublication)}
        onOpenChange={(open) => !open && setSelectedId(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          {selectedPublication ? (
            <>
              <DialogHeader>
                {selectedPublication.coverImage ? (
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] rounded-xl border border-slate-200 bg-slate-100 p-2 sm:max-w-[320px]">
                    <Image
                      src={selectedPublication.coverImage}
                      alt={`${selectedPublication.title} cover`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ) : null}
                <DialogTitle>{selectedPublication.title}</DialogTitle>
                <DialogDescription>
                  {selectedPublication.authors}
                </DialogDescription>
              </DialogHeader>
              <div>
                {selectedPublication.abstract ? (
                  <p className="text-sm mt-5 text-slate-700">
                    {selectedPublication.abstract}
                  </p>
                ) : null}
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-slate-600">
                  {selectedPublication.year && String(selectedPublication.year)}
                </p>
              </div>

              <DialogFooter>
                {selectedPublication.url ? (
                  <a
                    href={selectedPublication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="teal-link inline-flex items-center rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold transition hover:bg-teal-800"
                  >
                    View Publication
                  </a>
                ) : null}
                <DialogClose className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Close
                </DialogClose>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
