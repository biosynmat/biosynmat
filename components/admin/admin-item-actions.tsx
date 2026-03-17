type AdminItemActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function AdminItemActions({ onEdit, onDelete }: AdminItemActionsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
      >
        Remove
      </button>
    </div>
  );
}
