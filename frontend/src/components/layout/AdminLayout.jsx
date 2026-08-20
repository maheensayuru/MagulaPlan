import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaTachometerAlt, FaStore, FaUsers, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa'
import Logo from './Logo'
import { useAuth } from '../../context/AuthContext'

const items = [
  { to: '/admin', label: 'Overview', icon: FaTachometerAlt, end: true },
  { to: '/admin/vendors', label: 'Vendor Approvals', icon: FaStore },
  { to: '/admin/users', label: 'User Management', icon: FaUsers },
]

function NavItems({ onNavigate }) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive ? 'bg-white/10 text-gold-300' : 'text-ivory-100/60 hover:bg-white/5 hover:text-ivory-100'
            }`
          }
        >
          <item.icon size={16} />
          {item.label}
        </NavLink>
      ))}
    </>
  )
}

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-ink-gradient h-screen sticky top-0">
        <div className="h-18 flex items-center px-6 border-b border-white/10">
          <Logo />
        </div>
        <div className="px-4 pt-4">
          <span className="section-eyebrow text-gold-400/80 px-3">Admin Panel</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItems />
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ivory-100/60 hover:bg-white/5 hover:text-ivory-100 transition-colors">
            <FaArrowLeft size={14} /> Back to site
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ivory-100/60 hover:bg-white/5 hover:text-ivory-100 w-full transition-colors"
          >
            <FaSignOutAlt size={16} /> Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-ink-gradient h-16 flex items-center justify-between px-4">
          <button aria-label="Open menu" onClick={() => setDrawerOpen(true)} className="text-ivory-100">
            <FaBars size={18} />
          </button>
          <Logo />
          <span className="w-[18px]" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-72 bg-ink-gradient z-50 lg:hidden p-4"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <Logo />
                <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="text-ivory-100">
                  <FaTimes size={18} />
                </button>
              </div>
              <nav className="space-y-1">
                <NavItems onNavigate={() => setDrawerOpen(false)} />
              </nav>
              <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
                <NavLink to="/dashboard" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ivory-100/60">
                  <FaArrowLeft size={14} /> Back to site
                </NavLink>
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ivory-100/60 w-full">
                  <FaSignOutAlt size={16} /> Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
