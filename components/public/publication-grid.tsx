"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const selectedPublication = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  const slideshowItems = useMemo(
    () => items.filter((item) => Boolean(item.coverImage)),
    [items],
  );
  const safeCurrentSlide =
    slideshowItems.length > 0 ? currentSlide % slideshowItems.length : 0;

  useEffect(() => {
    if (slideshowItems.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowItems.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slideshowItems.length]);

  return (
    <>
      {slideshowItems.length > 0 ? (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative h-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-[460px]">
            {slideshowItems.map((item, index) => (
              <button
                key={`slide-${item.id}`}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`absolute inset-0 transition-opacity duration-700 ${index === safeCurrentSlide ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-label={`Open ${item.title}`}
              >
                <div className="flex h-full flex-col">
                  <div className="relative flex-1 bg-slate-100 p-3">
                    <Image
                      src={item.coverImage ?? ""}
                      alt={`${item.title} cover`}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="border-t border-slate-200 bg-white p-4 text-left sm:p-5">
                    <p className="line-clamp-2 text-base font-bold leading-tight text-slate-900 sm:text-xl">
                      {item.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-700 sm:text-sm">
                      {item.authors}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {slideshowItems.length > 1 ? (
            <div className="mt-3 flex items-center justify-center gap-2">
              {slideshowItems.map((item, index) => (
                <button
                  key={`slide-dot-${item.id}`}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${index === safeCurrentSlide ? "w-6 bg-teal-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

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
        <DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:max-w-3xl sm:p-6">
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

              <DialogFooter className="bg-white">
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
