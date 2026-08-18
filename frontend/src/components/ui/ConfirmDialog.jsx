import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', message, confirmLabel = 'Delete', loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-charcoal/70 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} disabled={loading} className="btn-ghost text-sm">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 text-white font-semibold px-6 py-3 transition-all hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? 'Working...' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
