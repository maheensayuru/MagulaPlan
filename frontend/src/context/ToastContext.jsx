import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const ToastContext = createContext(null)

const icons = {
  success: <FaCheckCircle className="text-emerald-500" size={18} />,
  error: <FaExclamationCircle className="text-red-500" size={18} />,
  info: <FaInfoCircle className="text-gold-600" size={18} />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 3500)
  }, [])

  const dismiss = (id) => setToasts((t) => t.filter((toast) => toast.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60 }}
              className="flex items-center gap-3 bg-white rounded-xl2 shadow-soft border border-charcoal/5 px-4 py-3"
              role="status"
            >
              {icons[toast.type]}
              <p className="text-sm text-charcoal flex-1">{toast.message}</p>
              <button onClick={() => dismiss(toast.id)} aria-label="Dismiss notification" className="text-charcoal/40 hover:text-charcoal">
                <FaTimes size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
