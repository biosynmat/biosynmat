"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import type { NewsRecord } from "@/lib/admin-types";
import { readNews } from "@/lib/firebase/public-read";
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
  const [items, setItems] = useState<NewsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const records = await readNews(limitCount);
        setItems(records);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [limitCount]);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading news...</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-600">No news added yet.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              width={720}
              height={360}
              className="mb-3 h-40 w-full rounded-xl border border-slate-200 object-cover"
            />
          ) : null}
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />
            {item.date}
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            {item.title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {item.summary}
          </p>
          {item.contentHtml ? (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                >
                  Know More
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={675}
                    className="mb-4 h-52 w-full rounded-xl border border-slate-200 object-cover sm:h-fit"
                  />
                ) : null}
                <DialogHeader className="pr-8">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {item.date}
                  </p>
                  <DialogTitle>{item.title}</DialogTitle>
                  <DialogDescription>{item.summary}</DialogDescription>
                </DialogHeader>
                <div
                  className="prose prose-slate mt-4 max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />
              </DialogContent>
            </Dialog>
          ) : null}
        </article>
      ))}
    </div>
  );
}
