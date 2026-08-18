import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaShare, FaCheck, FaCopy, FaUsers, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import FormField from '../components/ui/FormField'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import { SkeletonCard } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import { guestsApi } from '../services/api'

const SIDE_OPTIONS = [
  { value: 'Bride', label: 'Bride' },
  { value: 'Groom', label: 'Groom' },
]

const RSVP_OPTIONS = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Attending', label: 'Attending' },
  { value: 'Declined', label: 'Declined' },
]

const emptyForm = {
  guestName: '',
  contactNumber: '',
  sideOfFamily: 'Bride',
  plusOnes: '',
  mealPreference: '',
}

export default function GuestList() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const { showToast } = useToast()

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await guestsApi.list()
      setGuests(data)
    } catch (e) {
      setError(e.message || 'Failed to load guests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (guest) => {
    setEditing(guest)
    setForm({
      guestName: guest.guestName || '',
      contactNumber: guest.contactNumber || '',
      sideOfFamily: guest.sideOfFamily || 'Bride',
      plusOnes: guest.plusOnes ?? '',
      mealPreference: guest.mealPreference || '',
    })
    setModalOpen(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      guestName: form.guestName,
      contactNumber: form.contactNumber,
      sideOfFamily: form.sideOfFamily,
      plusOnes: form.plusOnes === '' ? 0 : Number(form.plusOnes),
      mealPreference: form.mealPreference,
    }
    try {
      if (editing) {
        await guestsApi.update(editing.guestId, payload)
        showToast('Guest updated', 'success')
      } else {
        await guestsApi.create(payload)
        showToast('Guest added', 'success')
      }
      setModalOpen(false)
      load()
    } catch (err) {
      showToast(err.message || 'Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setDeleteLoading(true)
    try {
      await guestsApi.remove(deleting.guestId)
      showToast('Guest removed', 'success')
      setDeleting(null)
      load()
    } catch (err) {
      showToast(err.message || 'Failed to delete', 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleShare = async (guest) => {
    try {
      const data = await guestsApi.share(guest.guestId)
      const rsvpUrl = data.rsvpUrl
      if (navigator.share) {
        await navigator.share({
          title: data.title || 'Wedding Invitation',
          text: data.message || 'You are invited! RSVP here:',
          url: rsvpUrl,
        })
      } else {
        await navigator.clipboard.writeText(rsvpUrl)
        setCopiedId(guest.guestId)
        showToast('Invitation link copied!', 'success')
        setTimeout(() => setCopiedId(null), 2000)
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return
      showToast(err.message || 'Failed to share', 'error')
    }
  }

  const confirmed = guests.filter((g) => g.rsvpStatus === 'Attending')
  const pending = guests.filter((g) => g.rsvpStatus !== 'Attending' && g.rsvpStatus !== 'Declined')
  const declined = guests.filter((g) => g.rsvpStatus === 'Declined')

  const rsvpVariant = (s) => (s === 'Attending' ? 'success' : s === 'Declined' ? 'error' : 'gold')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal">Guest List</h1>
          <p className="text-charcoal/50 text-sm mt-1">{guests.length} guests · {confirmed.length} attending</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <FaPlus size={13} /> Add Guest
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error ? (
        <div className="card p-8 text-center">
          <p className="text-charcoal/70 font-medium">{error}</p>
          <button onClick={load} className="btn-outline text-sm mt-4">Try again</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Attending', count: confirmed.length, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { label: 'Pending', count: pending.length, color: 'bg-gold-50 text-gold-700 border-gold-200' },
              { label: 'Declined', count: declined.length, color: 'bg-maroon-50 text-maroon-700 border-maroon-200' },
            ].map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl border px-4 py-3 text-center ${s.color}`}>
                <div className="text-2xl font-bold font-display">{s.count}</div>
                <div className="text-xs font-medium mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {guests.length === 0 ? (
            <EmptyState
              title="No guests yet"
              subtitle="Add your first guest to start managing your wedding guest list."
              action={
                <button onClick={openAdd} className="btn-primary text-sm">
                  <FaPlus size={13} /> Add Guest
                </button>
              }
            />
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/8 bg-charcoal/[0.02]">
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Name</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60 hidden sm:table-cell">Side</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60 hidden md:table-cell">RSVP</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Share</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest) => (
                      <tr key={guest.guestId} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02] transition-colors">
                        <td className="px-5 py-3.5 font-medium text-charcoal">{guest.guestName}</td>
                        <td className="px-5 py-3.5 text-charcoal/50 hidden sm:table-cell">{guest.sideOfFamily}</td>
                        <td className="px-5 py-3.5 text-center hidden md:table-cell">
                          <Badge variant={rsvpVariant(guest.rsvpStatus)}>{guest.rsvpStatus || 'Pending'}</Badge>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <button
                            onClick={() => handleShare(guest)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold-50 text-gold-700 hover:bg-gold-100 transition-colors"
                          >
                            {copiedId === guest.guestId ? <><FaCheck size={11} /> Copied</> : <><FaShare size={11} /> Share</>}
                          </button>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openEdit(guest)} aria-label="Edit" className="h-8 w-8 flex items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 transition-colors">
                              <FaEdit size={13} />
                            </button>
                            <button onClick={() => setDeleting(guest)} aria-label="Delete" className="h-8 w-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition-colors">
                              <FaTrash size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Guest' : 'Add Guest'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Guest name" htmlFor="guestName">
            <input id="guestName" name="guestName" value={form.guestName} onChange={handleChange} required placeholder="Nadeesha Gunawardena" className="input-field" />
          </FormField>
          <FormField label="Contact number" htmlFor="contactNumber">
            <input id="contactNumber" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="0771234567" className="input-field" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Side of family" id="sideOfFamily" value={form.sideOfFamily} onChange={handleChange} options={SIDE_OPTIONS} />
            <FormField label="Plus ones" htmlFor="plusOnes">
              <input id="plusOnes" name="plusOnes" type="number" min="0" value={form.plusOnes} onChange={handleChange} placeholder="0" className="input-field" />
            </FormField>
          </div>
          <FormField label="Meal preference" htmlFor="mealPreference">
            <input id="mealPreference" name="mealPreference" value={form.mealPreference} onChange={handleChange} placeholder="Veg, Non-veg..." className="input-field" />
          </FormField>
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? 'Saving...' : editing ? 'Update Guest' : 'Add Guest'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        message={`Remove "${deleting?.guestName}" from your guest list?`}
        loading={deleteLoading}
      />
    </div>
  )
}
