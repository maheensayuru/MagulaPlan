import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaBell, FaSearch, FaTachometerAlt, FaStore } from 'react-icons/fa'
import Sidebar from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import Logo from './Logo'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/vendors', label: 'Vendors', icon: FaStore },
]

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-charcoal/8 h-16 flex items-center justify-between px-4">
          <button aria-label="Open menu" onClick={() => setDrawerOpen(true)} className="text-charcoal">
            <FaBars size={18} />
          </button>
          <Logo />
          <button aria-label="Notifications" className="relative text-charcoal">
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-maroon-500" />
          </button>
        </header>

        <div className="hidden lg:flex items-center justify-between h-18 px-8 border-b border-charcoal/8 bg-white">
          <div className="relative w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={14} />
            <input className="input-field pl-10 py-2.5" placeholder="Search vendors..." />
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Notifications" className="relative text-charcoal/60 hover:text-maroon-500">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-maroon-500" />
            </button>
            <img src="https://i.pravatar.cc/80?img=47" alt="Profile" className="h-9 w-9 rounded-full object-cover border-2 border-gold-300" />
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />

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
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden p-4"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <Logo />
                <button aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
                  <FaTimes size={18} />
                </button>
              </div>
              <nav className="space-y-1">
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                        isActive ? 'bg-maroon-50 text-maroon-600' : 'text-charcoal/60'
                      }`
                    }
                  >
                    <item.icon size={16} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
