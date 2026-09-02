import { useEffect, useId, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

const sizes = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
}

// Elements that can receive keyboard focus (used to keep Tab inside the dialog).
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  const titleId = useId()
  const dialogRef = useRef(null)

  // Call sites usually pass an inline `onClose={() => setOpen(false)}`, so its
  // identity changes on every parent re-render (e.g. every keystroke in a form
  // field inside the dialog). Keep the latest handler in a ref so the effect
  // below can depend only on `open`. Otherwise it tears down and re-runs on
  // each render, stealing focus back out of whatever input the user is typing in.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    // Move focus into the dialog once mounted so keyboard and screen reader
    // users are not left behind the overlay. Focusing the container announces
    // the dialog's accessible name (via aria-labelledby) to screen readers.
    const frame = requestAnimationFrame(() => dialogRef.current?.focus())

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      cancelAnimationFrame(frame)
      previouslyFocused?.focus?.()
    }
    // onClose is read through onCloseRef, so it is intentionally not a dependency
    // here. Re-running this effect on every parent render is what caused the
    // focus-loss bug in the Guest and Budget forms.
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={`relative w-full ${sizes[size]} card rounded-b-none sm:rounded-xl2 p-6 sm:p-8 max-h-[90vh] overflow-y-auto outline-none`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id={titleId} className="text-xl font-display font-bold text-charcoal">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="h-9 w-9 flex items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
