import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaHeart, FaEdit, FaCheck, FaTimes, FaGlassCheers } from 'react-icons/fa'
import { usersApi } from '../../services/api'
import { useToast } from '../../context/ToastContext'

const DEFAULT_EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding Day & Poruwa', offsetHours: 9 },
  { id: 'nekath', label: 'Auspicious Nekath Ceremony', offsetHours: 10.25 },
  { id: 'reception', label: 'Evening Reception', offsetHours: 18.5 },
  { id: 'homecoming', label: 'Homecoming Celebration', offsetHours: 19 },
]

export default function CountdownTimer({ initialDate, onDateChange, title = 'Wedding Countdown' }) {
  const { showToast } = useToast()
  
  // Default target date: 6 months in future if not set
  const getDefaultTarget = () => {
    const d = new Date()
    d.setMonth(d.getMonth() + 6)
    return d.toISOString().split('T')[0]
  }

  const [targetDateStr, setTargetDateStr] = useState(() => {
    return initialDate || localStorage.getItem('magula_wedding_date') || getDefaultTarget()
  })
  
  const [selectedEvent, setSelectedEvent] = useState(DEFAULT_EVENT_TYPES[0].id)
  const [isEditing, setIsEditing] = useState(false)
  const [tempDate, setTempDate] = useState(targetDateStr)
  const [savingDate, setSavingDate] = useState(false)

  // Sync if initialDate changes from props (e.g., user profile fetched)
  useEffect(() => {
    if (initialDate && initialDate !== targetDateStr) {
      setTargetDateStr(initialDate)
      setTempDate(initialDate)
    }
  }, [initialDate])

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    totalSeconds: 0,
  })

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(`${targetDateStr}T09:00:00`)
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, totalSeconds: 0 })
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setTimeLeft({ days, hours, minutes, seconds, isPast: false, totalSeconds })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDateStr])

  const handleSaveDate = async (e) => {
    e.preventDefault()
    if (!tempDate) return
    setSavingDate(true)
    try {
      localStorage.setItem('magula_wedding_date', tempDate)
      setTargetDateStr(tempDate)
      setIsEditing(false)
      if (onDateChange) onDateChange(tempDate)
      
      // Attempt to save to backend profile if logged in
      try {
        await usersApi.update({ weddingDate: tempDate })
      } catch {
        // Local state already updated
      }
      showToast('Wedding event date updated!', 'success')
    } catch {
      showToast('Failed to update date', 'error')
    } finally {
      setSavingDate(false)
    }
  }

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(`${targetDateStr}T00:00:00`)
      return d.toLocaleDateString('en-LK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return targetDateStr
    }
  }, [targetDateStr])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#721F3A] via-[#5C162D] to-[#451021] text-white p-6 sm:p-8 shadow-lg border border-maroon-700/40"
    >
      {/* Decorative background overlay */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-blush-300/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 rounded-full bg-sage-400/10 blur-xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold tracking-wider uppercase text-blush-200 mb-2">
            <FaClock size={11} className="text-blush-300" />
            <span>Event Countdown & Nekath Timing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-white flex items-center gap-2">
            {title}
            <FaHeart size={14} className="text-blush-300 fill-current animate-pulse" />
          </h2>
          <p className="text-xs sm:text-sm text-blush-100/70 mt-1 flex items-center gap-1.5">
            <FaCalendarAlt size={12} className="text-blush-300/80" />
            <span>{formattedDate}</span>
          </p>
        </div>

        {/* Change Date Trigger */}
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-xs transition-colors border border-white/15"
            >
              <FaEdit size={11} /> Change Date
            </button>
          ) : (
            <form onSubmit={handleSaveDate} className="flex items-center gap-2 bg-black/30 p-1.5 rounded-lg border border-white/20">
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="bg-white/90 text-charcoal text-xs px-2.5 py-1 rounded border-0 focus:ring-1 focus:ring-blush-300"
                required
              />
              <button
                type="submit"
                disabled={savingDate}
                aria-label="Save date"
                className="h-7 w-7 rounded bg-sage-600 hover:bg-sage-700 text-white flex items-center justify-center transition-colors"
              >
                <FaCheck size={11} />
              </button>
              <button
                type="button"
                onClick={() => { setIsEditing(false); setTempDate(targetDateStr); }}
                aria-label="Cancel date change"
                className="h-7 w-7 rounded bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <FaTimes size={11} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Event Milestones Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 my-5">
        {DEFAULT_EVENT_TYPES.map((evt) => (
          <button
            key={evt.id}
            onClick={() => setSelectedEvent(evt.id)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              selectedEvent === evt.id
                ? 'bg-white text-maroon-900 shadow-sm font-semibold'
                : 'bg-white/10 text-white/80 hover:bg-white/15'
            }`}
          >
            {evt.label}
          </button>
        ))}
      </div>

      {/* Countdown Grid */}
      <div className="relative z-10">
        {timeLeft.isPast ? (
          <div className="py-6 text-center bg-white/10 backdrop-blur-xs rounded-xl border border-white/20">
            <FaGlassCheers size={32} className="mx-auto mb-2 text-blush-200" />
            <h3 className="text-xl font-display font-semibold">Today is the Big Day! 💍✨</h3>
            <p className="text-sm text-blush-100/80 mt-1">May your wedding journey be filled with everlasting joy and love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col justify-center items-center py-3.5 sm:py-5 px-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner"
              >
                <span className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white drop-shadow-sm">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-blush-200/90 font-medium mt-1">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Auspicious Blessing / Nekath Footnote */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-blush-100/70">
        <span>✨ Traditional Sri Lankan Nekath Timing & Auspicious Poruwa Coordination</span>
        <span className="hidden sm:inline font-mono text-[11px] text-blush-200/90">
          {timeLeft.isPast ? 'Celebrated' : `${timeLeft.days} days remaining`}
        </span>
      </div>
    </motion.div>
  )
}
