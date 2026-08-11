import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaStore, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import Logo from './Logo'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/vendors', label: 'Vendors', icon: FaStore },
  { to: '/guests', label: 'Guests', icon: FaUsers },
]

export default function Sidebar() {
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
                isActive ? 'bg-maroon-50 text-maroon-600' : 'text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal'
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-charcoal/8">
        <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal/50 hover:bg-charcoal/5 w-full">
          <FaSignOutAlt size={16} /> Log out
        </NavLink>
      </div>
    </aside>
  )
}
