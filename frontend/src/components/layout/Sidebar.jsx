import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaTachometerAlt, FaStore, FaUsers, FaWallet, FaBell, FaUser, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import Logo from './Logo'
import { useAuth } from '../../context/AuthContext'
const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/vendors', label: 'Vendors', icon: FaStore },
  { to: '/guests', label: 'Guests', icon: FaUsers },
  { to: '/budget', label: 'Budget', icon: FaWallet },
]

const accountItems = [
  { to: '/vendor/dashboard', label: 'Vendor Portal', icon: FaStore },
  { to: '/notifications', label: 'Notifications', icon: FaBell },
  { to: '/profile', label: 'Profile', icon: FaUser },
  { to: '/settings', label: 'Settings', icon: FaCog },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-gray-100 bg-white h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {(isAuthenticated ? items : [
          { to: '/', label: 'Home', icon: FaTachometerAlt, end: true },
          { to: '/vendors', label: 'Vendors', icon: FaStore },
          { to: '/vendors/new', label: 'List Business', icon: FaPlus },
        ]).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blush-100 text-maroon-700 font-semibold shadow-xs' : 'text-charcoal/65 hover:bg-blush-50/60 hover:text-maroon-700'
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
        {isAuthenticated && (
          <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
            {accountItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-blush-100 text-maroon-700 font-semibold shadow-xs' : 'text-charcoal/65 hover:bg-blush-50/60 hover:text-maroon-700'
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      {isAuthenticated ? (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-charcoal/50 hover:bg-gray-50 hover:text-charcoal w-full transition-colors"
          >
            <FaSignOutAlt size={16} /> Log out
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            to="/login"
            className="btn-outline text-xs w-full text-center block py-2"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="btn-primary text-xs w-full text-center block py-2"
          >
            Get started
          </Link>
        </div>
      )}
    </aside>
  )
}
