import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaWallet, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import FormField from '../components/ui/FormField'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import { SkeletonCard } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import { budgetApi } from '../services/api'
import { useAsyncData } from '../lib/useAsyncData'

const CHART_COLORS = ['#1B5744', '#C9A24B', '#4E9479', '#DFC069', '#78B29A', '#A9822F']

const STATUS_OPTIONS = [
  { value: 'Planned', label: 'Planned' },
  { value: 'Deposit Paid', label: 'Deposit Paid' },
  { value: 'Fully Paid', label: 'Fully Paid' },
]

const emptyForm = {
  itemName: '',
  category: '',
  estimatedCost: '',
  actualCost: '',
  depositPaid: '',
  status: 'Planned',
}

export default function BudgetTracker() {
  const { data: items = [], loading, error, reload } = useAsyncData(() => budgetApi.list(), { initialData: [] })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('')
  const { showToast } = useToast()


  const totals = useMemo(() => {
    const sum = (f) => items.reduce((s, i) => s + (Number(i[f]) || 0), 0)
    return {
      estimated: sum('estimatedCost'),
      actual: sum('actualCost'),
      deposit: sum('depositPaid'),
    }
  }, [items])

  const categories = useMemo(() => [...new Set(items.map((i) => i.category).filter(Boolean))], [items])

  const spendByCategory = useMemo(() => {
    const map = new Map()
    items.forEach((i) => {
      const key = i.category || 'Uncategorized'
      const amount = Number(i.estimatedCost) || 0
      if (amount <= 0) return
      map.set(key, (map.get(key) || 0) + amount)
    })
    return [...map.entries()].map(([name, value]) => ({ name, value }))
  }, [items])

  const filtered = useMemo(() => {
    if (!categoryFilter) return items
    return items.filter((i) => i.category === categoryFilter)
  }, [items, categoryFilter])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({
      itemName: item.itemName || '',
      category: item.category || '',
      estimatedCost: item.estimatedCost ?? '',
      actualCost: item.actualCost ?? '',
      depositPaid: item.depositPaid ?? '',
      status: item.status || 'Planned',
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
      itemName: form.itemName,
      category: form.category,
      estimatedCost: form.estimatedCost === '' ? 0 : Number(form.estimatedCost),
      actualCost: form.actualCost === '' ? 0 : Number(form.actualCost),
      depositPaid: form.depositPaid === '' ? 0 : Number(form.depositPaid),
      status: form.status,
    }
    try {
      if (editing) {
        await budgetApi.update(editing.budgetItemId, payload)
        showToast('Budget item updated', 'success')
      } else {
        await budgetApi.create(payload)
        showToast('Budget item added', 'success')
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
      await budgetApi.remove(deleting.budgetItemId)
      showToast('Budget item deleted', 'success')
      setDeleting(null)
      reload()
    } catch (err) {
      showToast(err.message || 'Failed to delete', 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  const money = (v) => `Rs. ${(Number(v) || 0).toLocaleString()}`
  const statusVariant = (s) => (s === 'Fully Paid' ? 'success' : s === 'Deposit Paid' ? 'gold' : 'neutral')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-medium text-charcoal">Budget Tracker</h1>
          <p className="text-charcoal/50 text-sm mt-1">Track your wedding expenses and payments.</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <FaPlus size={13} /> Add Item
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div className="card p-8 text-center">
          <p className="text-charcoal/70 font-medium">{error}</p>
          <button onClick={reload} className="btn-outline text-sm mt-4">Try again</button>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Estimated', value: money(totals.estimated), tone: 'text-charcoal' },
              { label: 'Total Actual', value: money(totals.actual), tone: 'text-charcoal' },
              { label: 'Deposit Paid', value: money(totals.deposit), tone: 'text-gold-600' },
              { label: 'Remaining', value: money(totals.estimated - totals.actual), tone: 'text-gold-800' },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-charcoal/50">{c.label}</span>
                  <FaWallet size={16} className={c.tone} />
                </div>
                <div className={`text-lg font-bold ${c.tone}`}>{c.value}</div>
              </motion.div>
            ))}
          </div>

          {spendByCategory.length > 0 && (
            <div className="card p-5 sm:p-6">
              <h2 className="font-display font-semibold text-charcoal mb-1">Spend by category</h2>
              <p className="text-xs text-charcoal/50 mb-4">Estimated cost, based on your budget items</p>
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={spendByCategory} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                        {spendByCategory.map((entry, i) => (
                          <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => money(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="space-y-2">
                  {spendByCategory.map((entry, i) => (
                    <li key={entry.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-charcoal/70">
                        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                        {entry.name}
                      </span>
                      <span className="font-medium text-charcoal">{money(entry.value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {categories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setCategoryFilter('')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!categoryFilter ? 'bg-gold-700 text-white' : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'}`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${categoryFilter === c ? 'bg-gold-700 text-white' : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              title="No budget items yet"
              subtitle="Add your first expense to start tracking your wedding budget."
              action={
                <button onClick={openAdd} className="btn-primary text-sm">
                  <FaPlus size={13} /> Add Item
                </button>
              }
            />
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/8 bg-charcoal/[0.02]">
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Item</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60 hidden sm:table-cell">Category</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-charcoal/60">Estimated</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-charcoal/60 hidden sm:table-cell">Actual</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60 hidden md:table-cell">Status</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.budgetItemId} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02] transition-colors">
                        <td className="px-5 py-3.5 font-medium text-charcoal">{item.itemName}</td>
                        <td className="px-5 py-3.5 text-charcoal/50 hidden sm:table-cell">{item.category}</td>
                        <td className="px-5 py-3.5 text-right text-charcoal/70">{money(item.estimatedCost)}</td>
                        <td className="px-5 py-3.5 text-right text-charcoal/70 hidden sm:table-cell">{money(item.actualCost)}</td>
                        <td className="px-5 py-3.5 text-center hidden md:table-cell">
                          <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openEdit(item)} aria-label="Edit" className="h-8 w-8 flex items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 transition-colors">
                              <FaEdit size={13} />
                            </button>
                            <button onClick={() => setDeleting(item)} aria-label="Delete" className="h-8 w-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition-colors">
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Budget Item' : 'Add Budget Item'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Item name" htmlFor="itemName">
            <input id="itemName" name="itemName" value={form.itemName} onChange={handleChange} required placeholder="Photography Package" className="input-field" />
          </FormField>
          <FormField label="Category" htmlFor="category">
            <input id="category" name="category" value={form.category} onChange={handleChange} required placeholder="Photography" className="input-field" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Estimated cost (LKR)" htmlFor="estimatedCost">
              <input id="estimatedCost" name="estimatedCost" type="number" min="0" value={form.estimatedCost} onChange={handleChange} placeholder="150000" className="input-field" />
            </FormField>
            <FormField label="Actual cost (LKR)" htmlFor="actualCost">
              <input id="actualCost" name="actualCost" type="number" min="0" value={form.actualCost} onChange={handleChange} placeholder="150000" className="input-field" />
            </FormField>
          </div>
          <FormField label="Deposit paid (LKR)" htmlFor="depositPaid">
            <input id="depositPaid" name="depositPaid" type="number" min="0" value={form.depositPaid} onChange={handleChange} placeholder="50000" className="input-field" />
          </FormField>
          <Select label="Status" id="status" value={form.status} onChange={handleChange} options={STATUS_OPTIONS} />
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? 'Saving...' : editing ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        message={`Delete "${deleting?.itemName}"? This cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  )
}
