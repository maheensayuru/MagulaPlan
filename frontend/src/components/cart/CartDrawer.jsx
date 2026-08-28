import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaTimes, FaTrash, FaShoppingBag, FaStore } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { cartApi } from '../../services/api'
import EmptyState from '../ui/EmptyState'

export default function CartDrawer() {
  const { items, count, total, open, setOpen, removeItem, clear } = useCart()
  const { userId } = useAuth()
  const { showToast } = useToast()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  const handleCheckout = async () => {
    if (!userId) {
      showToast('Please log in to request bookings.', 'error')
      return
    }
    try {
      await cartApi.checkout(userId, items.map((i) => i.vendorId))
      clear()
      setOpen(false)
      showToast('Bookings requested! Vendors will contact you.', 'success')
    } catch (err) {
      showToast(err.message || 'Could not send booking request. Please try again.', 'error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90]"
        >
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-ivory-100 shadow-soft flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/8 bg-white">
              <h2 className="text-lg font-display font-medium text-charcoal flex items-center gap-2">
                <FaShoppingBag className="text-gold-700" size={16} /> Your Selections
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="h-9 w-9 flex items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 transition-colors">
                <FaTimes size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <EmptyState
                  icon={FaShoppingBag}
                  title="Your cart is empty"
                  subtitle="Browse vendors and add the ones you're considering to compare them here."
                  action={
                    <Link to="/vendors" onClick={() => setOpen(false)} className="btn-outline text-sm">
                      Browse Vendors
                    </Link>
                  }
                />
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <motion.li
                      key={item.vendorId}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="card p-4 flex items-center gap-3"
                    >
                      <div className="h-14 w-14 rounded-xl2 overflow-hidden bg-gold-50 flex items-center justify-center shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <FaStore className="text-gold-400" size={18} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-charcoal text-sm truncate">{item.businessName}</p>
                        <p className="text-xs text-charcoal/50">
                          {[item.categoryName, item.districtLocation].filter(Boolean).join(' · ') || 'Vendor'}
                        </p>
                        {item.startingPrice > 0 && (
                          <p className="text-xs text-gold-800 font-semibold mt-0.5">Rs. {Number(item.startingPrice).toLocaleString()}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.vendorId)}
                        aria-label={`Remove ${item.businessName}`}
                        className="h-8 w-8 flex items-center justify-center rounded-full text-charcoal/40 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                      >
                        <FaTrash size={12} />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-charcoal/8 bg-white px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">{count} vendor{count === 1 ? '' : 's'} selected</span>
                  {total > 0 && <span className="font-semibold text-charcoal">From Rs. {total.toLocaleString()}</span>}
                </div>
                <button onClick={handleCheckout} className="btn-primary w-full">
                  Request Bookings
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
