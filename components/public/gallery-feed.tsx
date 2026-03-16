"use client";

import Image from "next/image";
import { CalendarDays, Images, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { GalleryRecord } from "@/lib/admin-types";

type GalleryFeedProps = {
  items: GalleryRecord[];
};

const spanClasses = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
];

export function GalleryFeed({ items }: GalleryFeedProps) {
  const [selected, setSelected] = useState<GalleryRecord | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const indexedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        spanClass:
          spanClasses[index % spanClasses.length] ??
          "md:col-span-1 md:row-span-1",
      })),
    [items],
  );

  const openModal = (item: GalleryRecord) => {
    setSelected(item);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelected(null);
  };

  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-600">No gallery images added yet.</p>
    );
  }

  return (
    <>
      <div className="grid auto-rows-[140px] gap-4 md:grid-cols-4 md:auto-rows-[170px]">
        {indexedItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openModal(item)}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm ${item.spanClass}`}
          >
            {item.images.length > 0 ? (
              <Image
                src={item.images[0] ?? ""}
                alt={item.title}
                width={1000}
                height={700}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-slate-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="truncate text-xs text-white/80">{item.date}</p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                <Search className="h-4 w-4" />
              </span>
            </div>
            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <Images className="h-3.5 w-3.5" />
              {item.images.length}
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/45 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                aria-label="Close viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[58vh] overflow-auto rounded-xl bg-slate-100 p-2 sm:max-h-[68vh]">
              {selected.images.length > 0 ? (
                <Image
                  src={selected.images[activeImageIndex] ?? selected.images[0] ?? ""}
                  alt={selected.title}
                  width={1600}
                  height={1000}
                  className="h-auto w-full rounded-lg border border-slate-200 object-contain"
                />
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-200 p-12 text-center text-sm text-slate-600">
                  No image available for this entry.
                </div>
              )}
            </div>

            {selected.images.length > 1 ? (
              <div className="mt-3 grid max-h-36 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6">
                {selected.images.map((url, index) => (
                  <button
                    key={`${url}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-md border ${activeImageIndex === index ? "border-teal-600" : "border-slate-200"}`}
                  >
                    <Image
                      src={url}
                      alt={`${selected.title} preview ${index + 1}`}
                      width={240}
                      height={160}
                      className="h-16 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-4">
              <p className="text-lg font-semibold text-slate-900">
                {selected.title}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4" />
                {selected.date}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                <Images className="h-3.5 w-3.5" />
                {selected.images.length} {selected.images.length === 1 ? "image" : "images"}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
