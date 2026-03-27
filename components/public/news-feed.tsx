"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { queryKeys } from "@/lib/query-keys";
import { readNews } from "@/lib/firebase/public-read";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NewsFeedProps = {
  limitCount?: number;
};

export function NewsFeed({ limitCount }: NewsFeedProps) {
  const { data: items = [], isLoading } = useQuery({
    queryKey: queryKeys.news(limitCount),
    queryFn: () => readNews(limitCount),
  });

  if (isLoading) {
    return <LoadingIndicator label="Loading news..." />;
  }

  if (items.length === 0) {
    return <EmptyState message="No news added yet." />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => {
        const newsImages =
          item.images.length > 0 ? item.images : item.image ? [item.image] : [];
        const coverImage = newsImages[0] ?? "";

        return (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={item.title}
                width={720}
                height={360}
                className="mb-3 aspect-[16/9] w-full rounded-xl border border-slate-200 bg-slate-50 object-contain"
              />
            ) : null}
            {item.date ? (
              <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" />
                {item.date}
              </p>
            ) : null}
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              {item.title}
            </h2>
            {item.summary ? (
              <p className="text-sm leading-relaxed text-slate-700">
                {item.summary}
              </p>
            ) : null}
            {item.images.length > 1 ? (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                +{item.images.length - 1} more photos
              </p>
            ) : null}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                >
                  Know More
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:max-w-5xl sm:p-6">
                {newsImages.length > 0 ? (
                  <div
                    className={`mb-4 grid gap-2 ${
                      newsImages.length === 1 ? "grid-cols-1 place-items-center" : "sm:grid-cols-2"
                    }`}
                  >
                    {newsImages.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className={`${newsImages.length === 1 ? "w-full max-w-2xl" : "w-full"}`}
                      >
                        <Image
                          src={url}
                          alt={`${item.title} image ${index + 1}`}
                          width={1200}
                          height={675}
                          className="aspect-[16/9] w-full rounded-xl border border-slate-200 bg-slate-50 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                <DialogHeader className="pr-8">
                  {item.date ? (
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.date}
                    </p>
                  ) : null}
                  <DialogTitle>{item.title}</DialogTitle>
                  {item.summary ? (
                    <DialogDescription>{item.summary}</DialogDescription>
                  ) : null}
                </DialogHeader>
                {item.contentHtml ? (
                  <div
                    className="prose prose-slate mt-4 max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                  />
                ) : null}
              </DialogContent>
            </Dialog>
          </article>
        );
      })}
    </div>
  );
}
