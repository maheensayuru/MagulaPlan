import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaStore, FaUsers, FaWallet } from 'react-icons/fa'

const items = [
  { to: '/dashboard', label: 'Home', icon: FaTachometerAlt, end: true },
  { to: '/vendors', label: 'Vendors', icon: FaStore },
  { to: '/guests', label: 'Guests', icon: FaUsers },
  { to: '/budget', label: 'Budget', icon: FaWallet },
]

export default function MobileBottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)] shadow-xs"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-maroon-700 font-semibold' : 'text-charcoal/45 hover:text-maroon-600'
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
