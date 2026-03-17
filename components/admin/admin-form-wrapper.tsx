import { LoadingIndicator } from "@/components/ui/loading-indicator";

type AdminFormWrapperProps = {
  children: React.ReactNode;
  title: string;
  editingId: string | null;
  isSaving: boolean;
  errorMessage: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
  /** Label for the submit button, e.g. "Team Member" → "Add Team Member" / "Update Team Member" */
  entityName: string;
  /** Form layout: "grid" uses a 2-column grid, "stack" uses vertical stacking */
  layout?: "grid" | "stack";
};

export function AdminFormWrapper({
  children,
  title,
  editingId,
  isSaving,
  errorMessage,
  onSubmit,
  onCancelEdit,
  entityName,
  layout = "grid",
}: AdminFormWrapperProps) {
  const layoutClass =
    layout === "grid"
      ? "grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2"
      : "space-y-3 rounded-2xl border border-slate-200 bg-white p-4";

  return (
    <>
      <form onSubmit={onSubmit} className={layoutClass}>
        <h2
          className={`text-xl font-semibold text-slate-900 ${layout === "grid" ? "sm:col-span-2" : ""}`}
        >
          {editingId ? `Edit ${title}` : `Add ${title}`}
        </h2>
        {children}

        <button
          type="submit"
          disabled={isSaving}
          className={`teal-link inline-flex w-fit rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60 ${layout === "grid" ? "sm:col-span-2" : ""}`}
        >
          {isSaving
            ? "Saving..."
            : editingId
              ? `Update ${entityName}`
              : `Add ${entityName}`}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className={`inline-flex w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 ${layout === "grid" ? "sm:col-span-2" : ""}`}
          >
            Cancel Edit
          </button>
        ) : null}
      </form>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </>
  );
}

type AdminListWrapperProps = {
  children: React.ReactNode;
  title: string;
  isLoading: boolean;
  loadingLabel?: string;
  /** Grid columns for the item list */
  gridCols?: string;
};

export function AdminListWrapper({
  children,
  title,
  isLoading,
  loadingLabel = "Loading...",
  gridCols = "sm:grid-cols-2",
}: AdminListWrapperProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {isLoading ? (
        <LoadingIndicator label={loadingLabel} className="mt-2 py-4" />
      ) : null}
      <div className={`mt-4 grid gap-3 ${gridCols}`}>{children}</div>
    </div>
  );
}
