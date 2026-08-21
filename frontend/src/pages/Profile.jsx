import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaCalendarAlt, FaEdit, FaCheckCircle, FaClock } from 'react-icons/fa'
import { LotusMark } from '../components/ui/Ornament'
import EmptyState from '../components/ui/EmptyState'
import { riseIn, staggerContainer } from '../lib/motion'
import { usersApi } from '../services/api'
import Loading from './Loading'

const PORUWA_CHECKLIST = [
  'Confirm Nekath (auspicious time) with the astrologer',
  'Book the Poruwa structure and decorator',
  'Arrange betel leaves, oil lamp and traditional items',
  'Confirm the Poruwa officiant / Kapuwa',
  'Prepare coconut, milk rice and ceremonial items',
  'Arrange traditional Kandyan drummers and dancers',
  'Confirm ceremony attire for both families',
  'Brief the photographer on key ceremony moments',
]

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [checked, setChecked] = useState({})

  useEffect(() => {
    let cancelled = false
    usersApi
      .me()
      .then((data) => {
        if (!cancelled) setProfile(data || null)
      })
      .catch(() => {
        // no profile endpoint yet — render the prompt/empty state below
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const toggleCheck = (item) => setChecked((c) => ({ ...c, [item]: !c[item] }))

  if (loading) return <Loading />

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial="hidden" animate="show" variants={riseIn} className="card p-6 sm:p-8 bg-ink-gradient text-white border-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="h-16 w-16 rounded-xl2 bg-white/10 flex items-center justify-center shrink-0">
            <FaUser size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-medium text-[#c29629]">
              {profile?.coupleNames || profile?.name || 'Your wedding profile'}
            </h1>
            {profile?.weddingDate ? (
              <p className="flex items-center gap-2 text-white/75 text-sm mt-2">
                <FaCalendarAlt size={13} /> {new Date(profile.weddingDate).toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            ) : (
              <p className="text-[#805e09] text-sm mt-2">
                No wedding date set yet — <Link to="/settings" className="underline hover:text-gold-200">add one in Settings</Link>
              </p>
            )}
          </div>
          <Link to="/settings" className="btn-gold text-sm self-start">
            <FaEdit size={13} /> Edit Profile
          </Link>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="show" variants={staggerContainer(0.06)} viewport={{ once: true, margin: '-40px' }} className="card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <FaClock className="text-gold-500" size={16} />
          <h2 className="font-display font-semibold text-lg text-charcoal">Wedding Day Timeline</h2>
        </div>
        <p className="text-charcoal/50 text-sm mb-5">Your personal run-of-show for the day.</p>
        {profile?.timeline?.length ? (
          <ul className="space-y-3">
            {profile.timeline.map((entry, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="font-semibold text-gold-800 w-20 shrink-0">{entry.time}</span>
                <span className="text-charcoal/80">{entry.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={FaClock}
            title="No timeline yet"
            subtitle="Once wedding-day planning is available, your run-of-show will appear here."
          />
        )}
      </motion.div>

      <motion.div initial="hidden" whileInView="show" variants={staggerContainer(0.06)} viewport={{ once: true, margin: '-40px' }} className="card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <LotusMark className="h-5 w-5 text-gold-500" />
          <h2 className="font-display font-semibold text-lg text-charcoal">Poruwa Ceremony Checklist</h2>
        </div>
        <p className="text-charcoal/50 text-sm mb-5">A general reference checklist for a traditional Poruwa ceremony — check items off as you go.</p>
        <ul className="space-y-2">
          {PORUWA_CHECKLIST.map((item) => (
            <motion.li key={item} variants={riseIn} className="flex items-start gap-3">
              <button
                onClick={() => toggleCheck(item)}
                aria-pressed={!!checked[item]}
                className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  checked[item] ? 'bg-gold-700 border-gold-700 text-white' : 'border-charcoal/20 text-transparent hover:border-gold-400'
                }`}
              >
                <FaCheckCircle size={13} />
              </button>
              <span className={`text-sm ${checked[item] ? 'text-charcoal/40 line-through' : 'text-charcoal/80'}`}>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
