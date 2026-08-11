import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaShare, FaWhatsapp, FaEnvelope, FaCheck, FaCopy, FaUsers } from 'react-icons/fa'
import { guests as mockGuests } from '../data/mockData'
import Badge from '../components/ui/Badge'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../context/ToastContext'
import SectionHeading from '../components/ui/SectionHeading'

const BASE_URL = 'https://magulaplan.com/rsvp'

export default function GuestList() {
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const { showToast } = useToast()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const handleShare = async (guest) => {
    const rsvpUrl = `${BASE_URL}/${guest.id}`
    const shareData = {
      title: 'Wedding Invitation',
      text: `You're invited! We request the pleasure of your company at our wedding. RSVP here: ${rsvpUrl}`,
      url: rsvpUrl,
    }

    // Try Web Share API first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        showToast('Shared successfully!', 'success')
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Fall back to copy if share fails
          copyToClipboard(rsvpUrl, guest.id)
        }
      }
    } else {
      // Desktop: copy link to clipboard
      copyToClipboard(rsvpUrl, guest.id)
    }
  }

  const copyToClipboard = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      showToast('Invitation link copied to clipboard!', 'success')
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      showToast('Failed to copy link', 'error')
    }
  }

  const confirmed = mockGuests.filter((g) => g.rsvp === 'confirmed')
  const pending = mockGuests.filter((g) => g.rsvp === 'pending')
  const declined = mockGuests.filter((g) => g.rsvp === 'declined')

  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Guest List"
        subtitle={`${mockGuests.length} guests · ${confirmed.reduce((s, g) => s + g.count, 0)} confirmed`}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Confirmed', count: confirmed.length, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { label: 'Pending', count: pending.length, color: 'bg-gold-50 text-gold-700 border-gold-200' },
          { label: 'Declined', count: declined.length, color: 'bg-maroon-50 text-maroon-700 border-maroon-200' },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border px-4 py-3 text-center ${s.color}`}
          >
            <div className="text-2xl font-bold font-display">{s.count}</div>
            <div className="text-xs font-medium mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Guest Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal/8 bg-charcoal/[0.02]">
                <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Name</th>
                <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60 hidden sm:table-cell">Side</th>
                <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">RSVP</th>
                <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60 hidden sm:table-cell">Guests</th>
                <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Share</th>
              </tr>
            </thead>
            <tbody>
              {mockGuests.map((guest, i) => (
                <motion.tr
                  key={guest.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.03 }}
                  className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-charcoal">{guest.name}</div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-charcoal/50">{guest.side}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge
                      variant={
                        guest.rsvp === 'confirmed' ? 'success' :
                        guest.rsvp === 'declined' ? 'danger' : 'gold'
                      }
                    >
                      {guest.rsvp}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-center hidden sm:table-cell">
                    <span className="text-charcoal/50">{guest.count}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => handleShare(guest)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold-50 text-gold-700 hover:bg-gold-100 transition-colors"
                      title="Share invitation via WhatsApp, email, or copy link"
                    >
                      {copiedId === guest.id ? (
                        <><FaCheck size={11} /> Copied</>
                      ) : (
                        <><FaShare size={11} /> Share</>
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Empty State */}
      {mockGuests.length === 0 && (
        <div className="card p-12 text-center">
          <FaUsers className="mx-auto text-charcoal/20 mb-3" size={40} />
          <p className="text-charcoal/50 font-medium">No guests yet</p>
          <p className="text-charcoal/30 text-sm mt-1">Add guests to start sending invitations.</p>
        </div>
      )}
    </div>
  )
}
