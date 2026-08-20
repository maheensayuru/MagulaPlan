import { useEffect, useMemo, useState } from 'react'
import { FaUsers, FaSearch, FaBan, FaCheckCircle } from 'react-icons/fa'
import EmptyState from '../../components/ui/EmptyState'
import Badge from '../../components/ui/Badge'
import { SkeletonCard } from '../../components/ui/Skeleton'
import { useToast } from '../../context/ToastContext'
import { adminApi } from '../../services/api'

export default function UserManagement() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [busyId, setBusyId] = useState(null)
  const { showToast } = useToast()

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminApi.users()
      setUsers(Array.isArray(data) ? data : [])
    } catch {
      // no admin endpoint yet — empty state below covers it
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const toggleStatus = async (user) => {
    const id = user.userId ?? user.id
    const suspended = user.status === 'SUSPENDED'
    setBusyId(id)
    try {
      await (suspended ? adminApi.reinstateUser(id) : adminApi.suspendUser(id))
      showToast(suspended ? `${user.name || 'User'} reinstated` : `${user.name || 'User'} suspended`, 'success')
      setUsers((list) =>
        list.map((u) => ((u.userId ?? u.id) === id ? { ...u, status: suspended ? 'ACTIVE' : 'SUSPENDED' } : u))
      )
    } catch (err) {
      showToast(err.message || 'Could not update yet — admin service is not connected', 'error')
    } finally {
      setBusyId(null)
    }
  }

  const visibleUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter((u) => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q))
  }, [users, search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-medium text-charcoal">User Management</h1>
          <p className="text-charcoal/50 text-sm mt-1">{users.length} registered couples on the platform.</p>
        </div>
        <div className="relative sm:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : users.length === 0 ? (
        <EmptyState icon={FaUsers} title="No users yet" subtitle="Registered couples will appear here once the admin API is connected." />
      ) : visibleUsers.length === 0 ? (
        <EmptyState title="No users match" subtitle="Try a different search." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal/8 bg-charcoal/[0.02]">
                  <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Name</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60 hidden sm:table-cell">Email</th>
                  <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Status</th>
                  <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map((user) => {
                  const id = user.userId ?? user.id
                  const suspended = user.status === 'SUSPENDED'
                  return (
                    <tr key={id} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02] transition-colors">
                      <td className="px-5 py-3.5 font-medium text-charcoal">{user.name || '—'}</td>
                      <td className="px-5 py-3.5 text-charcoal/50 hidden sm:table-cell">{user.email || '—'}</td>
                      <td className="px-5 py-3.5 text-center">
                        <Badge variant={suspended ? 'error' : 'success'}>{suspended ? 'Suspended' : 'Active'}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => toggleStatus(user)}
                          disabled={busyId === id}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                            suspended ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                        >
                          {suspended ? <><FaCheckCircle size={11} /> Reinstate</> : <><FaBan size={11} /> Suspend</>}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
