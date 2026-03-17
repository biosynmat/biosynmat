"use client";

import { cn } from "@/lib/utils";

type LoadingIndicatorProps = {
  label?: string;
  className?: string;
};

export function LoadingIndicator({
  label = "Loading data...",
  className,
}: LoadingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-6 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-4 border-teal-100" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-600 border-r-teal-400" />
        <span className="absolute inset-2 animate-pulse rounded-full bg-teal-100/80" />
      </div>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-teal-700 [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-teal-300" />
      </div>
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}
