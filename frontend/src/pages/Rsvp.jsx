import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaHeart, FaCheckCircle, FaTimesCircle, FaGlassCheers,
  FaCalendarAlt, FaMapMarkerAlt, FaUtensils, FaUserFriends,
  FaArrowLeft
} from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { LotusMark, SectionDivider } from '../components/ui/Ornament'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../context/ToastContext'
import { guestsApi } from '../services/api'

export default function Rsvp() {
  const { guestId } = useParams()
  const { showToast } = useToast()

  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rsvpChoice, setRsvpChoice] = useState('Attending') // 'Attending' | 'Declined'
  const [mealPreference, setMealPreference] = useState('Non-Veg')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadInvitation = async () => {
      setLoading(true)
      try {
        const data = await guestsApi.share(guestId)
        if (isMounted && data) {
          setInvitation(data)
          if (data.rsvpStatus && data.rsvpStatus !== 'Pending') {
            setRsvpChoice(data.rsvpStatus)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Invitation not found or link has expired.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (guestId) {
      loadInvitation()
    }
    return () => { isMounted = false }
  }, [guestId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await guestsApi.patchRsvp(guestId, rsvpChoice)
      setConfirmed(true)
      showToast('Your RSVP response has been submitted!', 'success')
    } catch (err) {
      showToast(err.message || 'Failed to submit RSVP. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SkeletonCard />
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-4 text-center">
        <div className="card max-w-md p-8 border-blush-200 shadow-sm space-y-4">
          <FaHeart className="mx-auto text-maroon-600/40" size={40} />
          <h1 className="text-xl font-display font-semibold text-charcoal">Invitation Not Found</h1>
          <p className="text-sm text-charcoal/60">
            {error || 'This digital invitation link is invalid or has expired.'}
          </p>
          <Link to="/" className="btn-outline text-xs">
            Return to MagulaPlan
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory-100 via-blush-50/40 to-ivory-100 py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-lg card p-8 sm:p-10 border-blush-200/80 shadow-md text-center relative overflow-hidden"
      >
        {/* Decorative corner embellishments */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blush-100/60 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-sage-100/50 blur-2xl pointer-events-none" />

        <div className="flex justify-center mb-4">
          <LotusMark className="h-9 w-9 text-maroon-700" />
        </div>

        <span className="section-eyebrow text-xs tracking-widest uppercase text-maroon-800/80 mb-1 block">
          Wedding Invitation & Digital RSVP
        </span>

        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-charcoal mb-2">
          {invitation.title || 'Wedding Celebration'}
        </h1>

        <p className="text-sm text-charcoal/70 leading-relaxed max-w-md mx-auto mb-6">
          {invitation.message || 'We request the honour of your presence to celebrate our special wedding day!'}
        </p>

        <SectionDivider className="mb-6" />

        {confirmed ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-3"
          >
            <FaCheckCircle size={32} className="mx-auto text-emerald-600" />
            <h2 className="text-lg font-display font-semibold">
              Thank You, {invitation.guestName}!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed">
              Your response has been confirmed as{' '}
              <strong className="font-bold text-emerald-900">{rsvpChoice}</strong>.
              The happy couple has received your confirmation.
            </p>
            <div className="pt-2">
              <Link to="/" className="text-xs text-emerald-800 font-semibold underline hover:text-emerald-950">
                Learn more about MagulaPlan
              </Link>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="p-4 rounded-lg bg-charcoal/[0.02] border border-charcoal/8 text-center">
              <span className="text-xs text-charcoal/50 uppercase font-semibold">Invited Guest</span>
              <p className="text-base font-semibold text-charcoal mt-0.5">{invitation.guestName}</p>
            </div>

            {/* Attendance Choice */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide block">
                Will you be attending?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRsvpChoice('Attending')}
                  className={`p-3.5 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    rsvpChoice === 'Attending'
                      ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 ring-2 ring-emerald-600/15'
                      : 'border-charcoal/10 hover:border-charcoal/20 text-charcoal/70'
                  }`}
                >
                  <FaCheckCircle className={rsvpChoice === 'Attending' ? 'text-emerald-600' : 'text-charcoal/30'} size={18} />
                  <span className="text-xs font-bold">Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRsvpChoice('Declined')}
                  className={`p-3.5 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    rsvpChoice === 'Declined'
                      ? 'border-red-500 bg-red-50/60 text-red-900 ring-2 ring-red-500/15'
                      : 'border-charcoal/10 hover:border-charcoal/20 text-charcoal/70'
                  }`}
                >
                  <FaTimesCircle className={rsvpChoice === 'Declined' ? 'text-red-500' : 'text-charcoal/30'} size={18} />
                  <span className="text-xs font-bold">Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Meal Preference if Attending */}
            {rsvpChoice === 'Attending' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 pt-1"
              >
                <label className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide flex items-center gap-1.5">
                  <FaUtensils size={11} className="text-maroon-700" /> Dietary / Meal Preference
                </label>
                <select
                  value={mealPreference}
                  onChange={(e) => setMealPreference(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="Non-Veg">Non-Vegetarian Banquet</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="No Preference">No Specific Preference</option>
                </select>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3 text-sm font-semibold shadow-xs"
            >
              {submitting ? 'Confirming RSVP...' : `Confirm RSVP (${rsvpChoice})`}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
