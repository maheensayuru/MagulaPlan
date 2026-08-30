import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBell, FaCheckDouble, FaTimes } from 'react-icons/fa'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import { notificationsApi } from '../services/api'
import Loading from './Loading'

export default function Notifications() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const { showToast } = useToast()

  useEffect(() => {
    let cancelled = false
    notificationsApi
      .list()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setNotifications(data)
      })
      .catch(() => {
        // no notifications endpoint yet. Empty state below covers it
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const markAllRead = async () => {
    try {
      await notificationsApi.markAllRead()
      setNotifications((list) => list.map((n) => ({ ...n, read: true })))
    } catch {
      showToast('Could not mark as read yet', 'error')
    }
  }

  const dismiss = async (id) => {
    const previous = notifications
    setNotifications((list) => list.filter((n) => n.id !== id))
    try {
      await notificationsApi.remove(id)
    } catch {
      setNotifications(previous)
      showToast('Could not dismiss yet', 'error')
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-medium text-charcoal">Notifications</h1>
          <p className="text-charcoal/50 text-sm mt-1">Updates on your guests, budget and vendors.</p>
        </div>
        {notifications.length > 0 && (
          <button onClick={markAllRead} className="btn-ghost text-sm">
            <FaCheckDouble size={13} /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={FaBell} title="No notifications yet" subtitle="You're all caught up! New updates will show up here." />
      ) : (
        <div className="card divide-y divide-charcoal/5 overflow-hidden">
          <AnimatePresence initial={false}>
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3 px-5 py-4"
              >
                {!n.read && <span className="h-2 w-2 rounded-full bg-gold-500 mt-2 shrink-0" />}
                <div className={`flex-1 ${n.read ? 'pl-5' : ''}`}>
                  <p className="text-sm text-charcoal">{n.message}</p>
                  {n.createdAt && <p className="text-xs text-charcoal/40 mt-1">{new Date(n.createdAt).toLocaleString()}</p>}
                </div>
                <button onClick={() => dismiss(n.id)} aria-label="Dismiss" className="text-charcoal/30 hover:text-charcoal shrink-0">
                  <FaTimes size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
