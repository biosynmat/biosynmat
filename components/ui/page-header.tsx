import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
};

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="inline-flex items-center gap-2 text-4xl font-semibold text-slate-900">
        {Icon ? <Icon className="h-8 w-8 text-teal-700" /> : null}
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-3xl text-slate-700">{description}</p>
      ) : null}
    </div>
  );
}
