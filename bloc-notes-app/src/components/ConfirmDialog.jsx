export function ConfirmDialog({ open, title, message, confirmLabel = 'Supprimer', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div
        className="absolute inset-0 bg-black/60"
        aria-hidden
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm rounded-lg border border-slate-700 bg-slate-900 p-4 shadow-xl">
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-slate-100">
          {title}
        </h2>
        <p id="confirm-dialog-desc" className="mt-2 text-sm text-slate-400">
          {message}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
