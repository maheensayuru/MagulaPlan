import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStore, FaUsers, FaClipboardCheck, FaCalendarCheck } from 'react-icons/fa'
import StatCard from '../../components/ui/StatCard'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { adminApi } from '../../services/api'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let cancelled = false
    adminApi
      .stats()
      .then((data) => {
        if (!cancelled) setStats(data)
      })
      .catch(() => {
        // no admin stats endpoint yet
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
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
      <div className="card p-6 sm:p-8 bg-gradient-to-r from-blush-100 via-blush-50 to-ivory-50 border border-blush-200 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-charcoal">Platform Overview</h1>
        <p className="text-charcoal/60 mt-1 max-w-md">A snapshot of MagulaPlan's vendors, couples, and pending approvals.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaStore} label="Total Vendors" value={stats?.totalVendors} display={stats?.totalVendors == null ? 'N/A' : undefined} color="sage" />
        <StatCard icon={FaUsers} label="Total Users" value={stats?.totalUsers} display={stats?.totalUsers == null ? 'N/A' : undefined} color="maroon" />
        <StatCard icon={FaClipboardCheck} label="Pending Approvals" value={stats?.pendingApprovals} display={stats?.pendingApprovals == null ? 'N/A' : undefined} color="sage" />
        <StatCard icon={FaCalendarCheck} label="Total Bookings" value={stats?.totalBookings} display={stats?.totalBookings == null ? 'N/A' : undefined} color="maroon" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/vendors" className="card card-hover p-6 flex items-center gap-4 border-blush-200/50">
          <div className="h-12 w-12 rounded-xl2 bg-blush-100 flex items-center justify-center text-maroon-700 shrink-0 border border-blush-200">
            <FaClipboardCheck size={20} />
          </div>
          <div>
            <p className="font-semibold text-charcoal">Review Vendor Approvals</p>
            <p className="text-sm text-charcoal/50">Approve or reject newly listed vendors.</p>
          </div>
        </Link>
        <Link to="/admin/users" className="card card-hover p-6 flex items-center gap-4 border-sage-200/50">
          <div className="h-12 w-12 rounded-xl2 bg-sage-100 flex items-center justify-center text-sage-700 shrink-0 border border-sage-200">
            <FaUsers size={20} />
          </div>
          <div>
            <p className="font-semibold text-charcoal">Manage Users</p>
            <p className="text-sm text-charcoal/50">View and manage couples using the platform.</p>
          </div>
        </Link>
      </div>

      {!stats && (
        <p className="text-center text-sm text-charcoal/40">
          Platform stats will appear here once the admin API is connected.
        </p>
      )}
    </div>
  )
}
