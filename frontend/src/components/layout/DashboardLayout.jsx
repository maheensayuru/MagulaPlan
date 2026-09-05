import { useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaBell, FaSearch, FaTachometerAlt, FaStore, FaUsers, FaWallet, FaUser, FaCog, FaShoppingBag } from 'react-icons/fa'
import Sidebar from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import Logo from './Logo'
import { notificationsApi } from '../../services/api'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

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
  const { isAuthenticated } = useAuth()
  const { count: cartCount, setOpen: setCartOpen } = useCart()
  useEffect(() => {
    let cancelled = false
    notificationsApi
      .list()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setUnreadCount(data.filter((n) => !n.read).length)
      })
      .catch(() => {
        // no notifications endpoint yet
      })
    return () => {
      cancelled = true
    }
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    if (!search.trim()) return
    navigate(`/vendors?search=${encodeURIComponent(search.trim())}`)
  }

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
          <button aria-label="Open menu" onClick={() => setDrawerOpen(true)} className="text-charcoal/70 hover:text-maroon-700">
            <FaBars size={18} />
          </button>
          <Logo />
          <div className="flex items-center gap-1">
            <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative h-9 w-9 flex items-center justify-center text-charcoal/70 hover:text-maroon-700">
              <FaShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-maroon-700 text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <NavLink to="/notifications" aria-label="Notifications" className="relative h-9 w-9 flex items-center justify-center text-charcoal/70 hover:text-maroon-700">
                <FaBell size={18} />
                {unreadCount > 0 && <span className="absolute 1 top-1.5 right-1.5 h-2 w-2 rounded-full bg-maroon-600" />}
              </NavLink>
            ) : (
              <Link to="/login" className="text-xs font-semibold text-maroon-700 px-2 py-1">
                Log in
              </Link>
            )}
          </div>
        </header>

        <div className="hidden lg:flex items-center justify-between h-16 px-8 border-b border-gray-100 bg-white">
          <form onSubmit={submitSearch} className="relative w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/35" size={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-sm"
              placeholder="Search vendors, tasks, guests..."
            />
          </form>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative text-charcoal/60 hover:text-maroon-700 transition-colors">
              <FaShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-maroon-700 text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <>
                <NavLink to="/notifications" aria-label="Notifications" className="relative text-charcoal/60 hover:text-maroon-700 transition-colors">
                  <FaBell size={18} />
                  {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-maroon-600" />}
                </NavLink>
                <NavLink
                  to="/profile"
                  aria-label="Profile"
                  className="h-8 w-8 rounded-full bg-blush-100 flex items-center justify-center text-maroon-700 border border-blush-300 hover:border-maroon-500 transition-colors"
                >
                  <FaUser size={13} />
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-xs py-1.5 px-3">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary text-xs py-1.5 px-3">
                  Get started
                </Link>
              </div>
            )}
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
              className="fixed inset-0 bg-charcoal/40 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden p-4 flex flex-col shadow-xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <Logo />
                <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="text-charcoal/60 hover:text-charcoal">
                  <FaTimes size={18} />
                </button>
              </div>
              <nav className="space-y-1 flex-1">
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'bg-blush-100 text-maroon-700 font-semibold' : 'text-charcoal/70 hover:bg-blush-50/50 hover:text-maroon-700'
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
