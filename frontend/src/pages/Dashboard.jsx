import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWallet, FaUsers, FaStore, FaPlus, FaSearch } from 'react-icons/fa'
import StatCard from '../components/ui/StatCard'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useAsyncData } from '../lib/useAsyncData'
import { budgetApi, guestsApi, vendorsApi } from '../services/api'

export default function Dashboard() {
  const { data: stats, loading, error } = useAsyncData(
    async () => {
      const [budgetItems, guests, vendors] = await Promise.all([
        budgetApi.list().catch(() => []),
        guestsApi.list().catch(() => []),
        vendorsApi.list().catch(() => []),
      ])
      const estimated = budgetItems.reduce((s, i) => s + (Number(i.estimatedCost) || 0), 0)
      return { budget: budgetItems.length, guests: guests.length, vendors: vendors.length, estimated }
    },
    { initialData: { budget: 0, guests: 0, vendors: 0, estimated: 0 } },
  )

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
        className="rounded-xl p-6 sm:p-8 bg-gradient-to-r from-blush-100 via-blush-50 to-ivory-50 border border-blush-200 shadow-xs"
      >
        <h1 className="text-2xl font-display font-semibold text-charcoal">Welcome back</h1>
        <p className="text-charcoal/65 mt-1 text-sm sm:text-base">
          Here's an overview of your wedding planning journey and tasks.
        </p>
        {error && <p className="text-maroon-700/80 mt-3 text-sm">{error}</p>}
      </motion.div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaWallet} label="Budget items" value={stats.budget} color="sage" />
        <StatCard icon={FaUsers} label="Guests" value={stats.guests} color="maroon" />
        <StatCard icon={FaStore} label="Vendors" value={stats.vendors} color="sage" />
        <StatCard icon={FaWallet} label="Total estimated (LKR)" value={stats.estimated} color="maroon" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-charcoal mb-4">Quick actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Find Vendors', icon: FaSearch, to: '/vendors', bg: 'bg-blush-100 text-maroon-700' },
            { label: 'Add Guest', icon: FaUsers, to: '/guests', bg: 'bg-sage-100 text-sage-700' },
            { label: 'Add Budget Item', icon: FaWallet, to: '/budget', bg: 'bg-blush-100 text-maroon-700' },
            { label: 'List Business', icon: FaPlus, to: '/vendors/new', bg: 'bg-sage-100 text-sage-700' },
          ].map((a, i) => (
            <motion.div key={a.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={a.to} className="card card-hover p-5 flex items-center gap-3.5 text-charcoal block">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${a.bg}`}>
                  <a.icon size={16} />
                </div>
                <span className="text-sm font-medium text-charcoal">{a.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
