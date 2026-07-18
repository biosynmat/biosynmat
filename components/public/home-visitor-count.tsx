"use client";

import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VISITOR_SESSION_KEY = "biosynmat-home-visit-counted";

type VisitorCountResponse = {
  total?: number;
};

function formatCount(total: number) {
  return new Intl.NumberFormat("en").format(total);
}

async function requestVisitorCount(shouldIncrement: boolean) {
  const response = await fetch("/api/visitor-count", {
    method: shouldIncrement ? "POST" : "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load visitor count.");
  }

  const payload = (await response.json()) as VisitorCountResponse;
  return typeof payload.total === "number" ? payload.total : 0;
}

export function HomeVisitorCount() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const displayCountRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function loadVisitorCount() {
      const hasCountedVisit =
        window.sessionStorage.getItem(VISITOR_SESSION_KEY) === "true";
      const total = await requestVisitorCount(!hasCountedVisit);

      if (!hasCountedVisit) {
        window.sessionStorage.setItem(VISITOR_SESSION_KEY, "true");
      }

      if (isMounted) {
        setVisitorCount(total);
      }
    }

    loadVisitorCount().catch(() => {
      if (isMounted) {
        setVisitorCount(null);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (visitorCount === null) {
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const startTime = performance.now();
    const startValue = displayCountRef.current;
    const difference = visitorCount - startValue;

    function animateCounter(currentTime: number) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextCount = Math.round(startValue + difference * easedProgress);
      displayCountRef.current = nextCount;
      setDisplayCount(nextCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounter);
      }
    }

    animationFrame = requestAnimationFrame(animateCounter);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [visitorCount]);

  if (visitorCount === null) {
    return null;
  }

  return (
    <div className="mt-8 inline-flex items-center gap-4 rounded-[1.35rem] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur sm:px-5">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
        <Eye className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Live Counter
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-sans text-3xl font-semibold tabular-nums leading-none text-slate-950 sm:text-4xl">
            {formatCount(displayCount)}
          </span>
          <span className="text-sm font-medium text-slate-600">
            homepage visitors
          </span>
        </div>
      </div>
    </div>
  );
}
