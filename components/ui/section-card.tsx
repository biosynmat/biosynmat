import { cn } from "@/lib/utils";

type SectionCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
};

export function SectionCard({
  children,
  className,
  variant = "default",
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-6 shadow-sm sm:p-8",
        variant === "accent"
          ? "border-teal-100 bg-teal-50"
          : "border-slate-200 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
