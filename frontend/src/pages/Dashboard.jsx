import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaWallet, FaUsers, FaStore, FaCheckCircle, FaSearch, FaCalendarAlt, FaClock,
} from 'react-icons/fa'
import StatCard from '../components/ui/StatCard'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import { SkeletonCard, SkeletonRow } from '../components/ui/Skeleton'
import { tasks, budgetItems, guests, vendors } from '../data/mockData'

const quickActions = [
  { label: 'Find Vendors', icon: FaSearch, to: '/vendors', color: 'maroon' },
]

const activity = [
  { text: 'Kandy Hills Resort confirmed your booking', time: '2 hours ago' },
  { text: 'Nadeesha Gunawardena RSVP\'d — pending', time: '5 hours ago' },
  { text: 'Payment of Rs. 92,000 made to Emerald Isle Decor', time: 'Yesterday' },
  { text: 'New task added: Confirm catering menu tasting', time: '2 days ago' },
]

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const totalEstimated = budgetItems.reduce((s, b) => s + b.estimated, 0)
  const totalPaid = budgetItems.reduce((s, b) => s + b.paid, 0)
  const confirmedGuests = guests.filter((g) => g.rsvp === 'confirmed').reduce((s, g) => s + g.count, 0)
  const doneTasks = tasks.filter((t) => t.done).length
  const weddingDate = new Date('2026-12-20')
  const daysLeft = Math.max(0, Math.ceil((weddingDate - new Date()) / (1000 * 60 * 60 * 24)))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-32 w-full rounded-xl2" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Countdown Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl3 bg-maroon-gradient p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative">
          <p className="text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <FaCalendarAlt size={11} /> Wedding Countdown
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ivory-50">{daysLeft} Days To Go</h2>
          <p className="text-ivory-100/70 text-sm mt-1">Saturday, December 20, 2026 · Kandy Hills Resort</p>
        </div>
        <button type="button" className="btn-gold relative shrink-0">Update Wedding Date</button>
      </motion.div>

      {/* Budget Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-charcoal flex items-center gap-2">
            <FaWallet className="text-gold-600" size={16} /> Budget Summary
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mb-5">
          <div>
            <p className="text-xs text-charcoal/50 mb-1">Total Estimated Budget</p>
            <p className="text-2xl font-display font-bold text-charcoal">Rs. {totalEstimated.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-charcoal/50 mb-1">Total Spent</p>
            <p className="text-2xl font-display font-bold text-maroon-600">Rs. {totalPaid.toLocaleString()}</p>
          </div>
        </div>
        <ProgressBar value={(totalPaid / totalEstimated) * 100} color="gold" height="h-3" showLabel />
      </motion.div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaWallet} label="Budget Spent" value={Math.round((totalPaid / totalEstimated) * 100)} suffix="%" color="gold" />
        <StatCard icon={FaUsers} label="Confirmed Guests" value={confirmedGuests} color="emerald" />
        <StatCard icon={FaStore} label="Vendors Booked" value={5} color="maroon" />
        <StatCard icon={FaCheckCircle} label="Tasks Completed" value={doneTasks} suffix={`/${tasks.length}`} color="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Wedding Progress + Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-lg text-charcoal">Wedding Progress</h3>
              <Badge variant="gold">67% Complete</Badge>
            </div>
            <ProgressBar value={67} color="gold" height="h-3" />
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-xl font-display font-bold text-maroon-600">5/8</p>
                <p className="text-xs text-charcoal/50">Vendors Booked</p>
              </div>
              <div>
                <p className="text-xl font-display font-bold text-maroon-600">{doneTasks}/{tasks.length}</p>
                <p className="text-xs text-charcoal/50">Tasks Done</p>
              </div>
              <div>
                <p className="text-xl font-display font-bold text-maroon-600">{confirmedGuests}</p>
                <p className="text-xs text-charcoal/50">Guests Confirmed</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg text-charcoal">Upcoming Tasks</h3>
            </div>
            <div className="space-y-1">
              {tasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 py-3 border-b border-charcoal/5 last:border-0"
                >
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-charcoal/20'}`}>
                    {task.done && <FaCheckCircle className="text-white" size={12} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${task.done ? 'text-charcoal/40 line-through' : 'text-charcoal'}`}>{task.title}</p>
                  </div>
                  <span className="text-xs text-charcoal/40 flex items-center gap-1 shrink-0">
                    <FaClock size={10} /> {task.due}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions + Activity */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-display font-semibold text-lg text-charcoal mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => {
                const colors = {
                  maroon: 'bg-maroon-50 text-maroon-500',
                  gold: 'bg-gold-100 text-gold-600',
                  emerald: 'bg-emerald-50 text-emerald-500',
                }
                return (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl2 border border-charcoal/8 hover:-translate-y-1 hover:shadow-card transition-all duration-300 text-center"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colors[action.color]}`}>
                      <action.icon size={16} />
                    </div>
                    <span className="text-xs font-medium text-charcoal/70">{action.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-display font-semibold text-lg text-charcoal mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-charcoal/80 leading-snug">{a.text}</p>
                    <p className="text-xs text-charcoal/40 mt-0.5">{a.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-gold-50 border-gold-200">
            <h3 className="font-display font-semibold text-charcoal mb-2">Recommended Vendor</h3>
            <div className="flex items-center gap-3">
              <img src={vendors[2].image} alt={vendors[2].name} className="h-14 w-14 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-semibold text-charcoal">{vendors[2].name}</p>
                <p className="text-xs text-charcoal/50">{vendors[2].categoryName} · {vendors[2].district}</p>
              </div>
            </div>
            <Link to={`/vendors/${vendors[2].id}`} className="btn-outline w-full mt-4 text-sm py-2">View Profile</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
