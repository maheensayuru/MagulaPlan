import { NavLink, useNavigate } from 'react-router-dom'
import { FaTachometerAlt, FaStore, FaUsers, FaWallet, FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import Logo from './Logo'
import { useAuth } from '../../context/AuthContext'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/vendors', label: 'Vendors', icon: FaStore },
  { to: '/guests', label: 'Guests', icon: FaUsers },
  { to: '/budget', label: 'Budget', icon: FaWallet },
]

const accountItems = [
  { to: '/notifications', label: 'Notifications', icon: FaBell },
  { to: '/profile', label: 'Profile', icon: FaUser },
  { to: '/settings', label: 'Settings', icon: FaCog },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-charcoal/8 bg-white h-screen sticky top-0">
      <div className="h-18 flex items-center px-6 border-b border-charcoal/8">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative ${
                isActive ? 'bg-gold-50 text-gold-800' : 'text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal'
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
        <div className="pt-4 mt-4 border-t border-charcoal/8 space-y-1">
          {accountItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative ${
                  isActive ? 'bg-gold-50 text-gold-800' : 'text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal'
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="p-4 border-t border-charcoal/8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal/50 hover:bg-charcoal/5 w-full transition-colors"
        >
          <FaSignOutAlt size={16} /> Log out
        </button>
      </div>
    </aside>
  )
}
