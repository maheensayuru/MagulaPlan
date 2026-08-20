import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaBell, FaSearch, FaTachometerAlt, FaStore, FaUsers, FaWallet, FaUser, FaCog, FaShoppingBag } from 'react-icons/fa'
import Sidebar from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import Logo from './Logo'
import { notificationsApi } from '../../services/api'
import { useCart } from '../../context/CartContext'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/vendors', label: 'Vendors', icon: FaStore },
  { to: '/guests', label: 'Guests', icon: FaUsers },
  { to: '/budget', label: 'Budget', icon: FaWallet },
  { to: '/notifications', label: 'Notifications', icon: FaBell },
  { to: '/profile', label: 'Profile', icon: FaUser },
  { to: '/settings', label: 'Settings', icon: FaCog },
]

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()
  const { count: cartCount, setOpen: setCartOpen } = useCart()

  useEffect(() => {
    let cancelled = false
    notificationsApi
      .list()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setUnreadCount(data.filter((n) => !n.read).length)
      })
      .catch(() => {
        // no notifications endpoint yet — leave the badge hidden rather than fabricate a count
      })
    return () => {
      cancelled = true
    }
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/vendors?search=${encodeURIComponent(search.trim())}`)
  }

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-charcoal/8 h-16 flex items-center justify-between px-4">
          <button aria-label="Open menu" onClick={() => setDrawerOpen(true)} className="text-charcoal">
            <FaBars size={18} />
          </button>
          <Logo />
          <div className="flex items-center gap-1">
            <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative h-9 w-9 flex items-center justify-center text-charcoal">
              <FaShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gold-700 text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <NavLink to="/notifications" aria-label="Notifications" className="relative h-9 w-9 flex items-center justify-center text-charcoal">
              <FaBell size={18} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gold-500" />}
            </NavLink>
          </div>
        </header>

        <div className="hidden lg:flex items-center justify-between h-18 px-8 border-b border-charcoal/8 bg-white">
          <form onSubmit={submitSearch} className="relative w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 py-2.5"
              placeholder="Search vendors, tasks, guests..."
            />
          </form>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative text-charcoal/60 hover:text-gold-700 transition-colors">
              <FaShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gold-700 text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <NavLink to="/notifications" aria-label="Notifications" className="relative text-charcoal/60 hover:text-gold-700">
              <FaBell size={18} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gold-500" />}
            </NavLink>
            <NavLink
              to="/profile"
              aria-label="Profile"
              className="h-9 w-9 rounded-full bg-gold-50 flex items-center justify-center text-gold-700 border-2 border-gold-300"
            >
              <FaUser size={14} />
            </NavLink>
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
                        isActive ? 'bg-gold-50 text-gold-800' : 'text-charcoal/60'
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
