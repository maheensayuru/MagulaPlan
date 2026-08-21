import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWallet, FaUsers, FaStore, FaPlus, FaSearch } from 'react-icons/fa'
import StatCard from '../components/ui/StatCard'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../context/ToastContext'
import { budgetApi, guestsApi, vendorsApi } from '../services/api'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ budget: 0, guests: 0, vendors: 0, estimated: 0 })
  const { showToast } = useToast()

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const [budgetItems, guests, vendors] = await Promise.all([
        budgetApi.list().catch(() => []),
        guestsApi.list().catch(() => []),
        vendorsApi.list().catch(() => []),
      ])
      const estimated = budgetItems.reduce((s, i) => s + (Number(i.estimatedCost) || 0), 0)
      setStats({ budget: budgetItems.length, guests: guests.length, vendors: vendors.length, estimated })
    } catch (e) {
      setError(e.message || 'Failed to load dashboard')
      showToast('Failed to load dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonCard />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 sm:p-8 bg-ink-gradient text-white border-none"
      >
        <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#c29629]">Welcome back</h1>
        <p className="text-[#705309] mt-2 max-w-md">
          Here's an overview of your wedding planning progress.
        </p>
        {error && <p className="text-ivory-100/80 mt-3 text-sm">{error}</p>}
      </motion.div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaWallet} label="Budget items" value={stats.budget} color="ink" />
        <StatCard icon={FaUsers} label="Guests" value={stats.guests} color="gold" />
        <StatCard icon={FaStore} label="Vendors" value={stats.vendors} color="ink" />
        <StatCard icon={FaWallet} label="Total estimated (LKR)" value={stats.estimated} color="gold" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-charcoal mb-3">Quick actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Find Vendors', icon: FaSearch, to: '/vendors' },
            { label: 'Add Guest', icon: FaUsers, to: '/guests' },
            { label: 'Add Budget Item', icon: FaWallet, to: '/budget' },
            { label: 'List Business', icon: FaPlus, to: '/vendors/new' },
          ].map((a, i) => (
            <motion.div key={a.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={a.to} className="card card-hover p-5 flex items-center gap-3 text-charcoal hover:text-gold-800">
                <div className="h-10 w-10 rounded-xl2 bg-gold-50 flex items-center justify-center">
                  <a.icon size={16} className="text-gold-700" />
                </div>
                <span className="font-medium text-sm">{a.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
