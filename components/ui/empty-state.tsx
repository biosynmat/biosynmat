import { cn } from "@/lib/utils";

type EmptyStateProps = {
  message: string;
  className?: string;
};

export function EmptyState({ message, className }: EmptyStateProps) {
  const isStayTuned = message.trim().toLowerCase().startsWith("stay tuned");

  return (
    <p
      className={cn(
        "text-sm text-slate-600",
        isStayTuned
          ? "empty-stay-tuned text-2xl font-semibold tracking-wide text-teal-800 sm:text-3xl"
          : "",
        className,
      )}
    >
      {message}
    </p>
  );
}
