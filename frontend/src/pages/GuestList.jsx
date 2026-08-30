import { useState, useMemo } from 'react'
import { FaShare, FaCheck, FaUsers, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import FormField from '../components/ui/FormField'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import StatCard from '../components/ui/StatCard'
import Tabs from '../components/ui/Tabs'
import { SkeletonCard } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import { guestsApi } from '../services/api'
import { useAsyncData } from '../lib/useAsyncData'

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'Attending', label: 'Attending' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Declined', label: 'Declined' },
]

const SIDE_OPTIONS = [
  { value: 'Bride', label: 'Bride' },
  { value: 'Groom', label: 'Groom' },
]

const emptyForm = {
  guestName: '',
  contactNumber: '',
  sideOfFamily: 'Bride',
  plusOnes: '',
  mealPreference: '',
}

export default function GuestList() {
  const { data: guests = [], loading, error, reload } = useAsyncData(() => guestsApi.list(), { initialData: [] })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { showToast } = useToast()


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
      reload()
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
      reload()
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

  const visibleGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'Pending' ? g.rsvpStatus !== 'Attending' && g.rsvpStatus !== 'Declined' : g.rsvpStatus === statusFilter)
      const matchesSearch = !search.trim() || (g.guestName || '').toLowerCase().includes(search.trim().toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [guests, statusFilter, search])

  const rsvpVariant = (s) => (s === 'Attending' ? 'success' : s === 'Declined' ? 'error' : 'blush')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-medium text-charcoal">Guest List</h1>
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
          <button onClick={reload} className="btn-outline text-sm mt-4">Try again</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={FaUsers} label="Total Guests" value={guests.length} color="sage" />
            <StatCard icon={FaCheck} label="Attending" value={confirmed.length} color="maroon" />
            <StatCard icon={FaUsers} label="Pending" value={pending.length} color="sage" />
            <StatCard icon={FaUsers} label="Declined" value={declined.length} color="maroon" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <Tabs tabs={FILTER_TABS} defaultTab="all" onChange={setStatusFilter} />
            <div className="relative sm:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guests..."
                className="input-field pl-10 py-2.5 text-sm"
              />
            </div>
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
          ) : visibleGuests.length === 0 ? (
            <EmptyState title="No guests match" subtitle="Try a different search or filter." />
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
                    {visibleGuests.map((guest) => (
                      <tr key={guest.guestId} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02] transition-colors">
                        <td className="px-5 py-3.5 font-medium text-charcoal">{guest.guestName}</td>
                        <td className="px-5 py-3.5 text-charcoal/50 hidden sm:table-cell">{guest.sideOfFamily}</td>
                        <td className="px-5 py-3.5 text-center hidden md:table-cell">
                          <Badge variant={rsvpVariant(guest.rsvpStatus)}>{guest.rsvpStatus || 'Pending'}</Badge>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <button
                            onClick={() => handleShare(guest)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blush-100 text-maroon-700 hover:bg-blush-200 border border-blush-200 transition-colors"
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
