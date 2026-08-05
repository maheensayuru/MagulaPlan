import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa'
import Logo from './Logo'

const columns = [
  {
    title: 'Plan',
    links: [
      { label: 'Find Vendors', to: '/vendors' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Log In', to: '/login' },
      { label: 'Create Account', to: '/register' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Photography', to: '/vendors?category=photography' },
      { label: 'Venues', to: '/vendors?category=hotels' },
      { label: 'Catering', to: '/vendors?category=catering' },
      { label: 'Bridal Wear', to: '/vendors?category=bridal-dresses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Privacy Policy', to: '/' },
      { label: 'Terms of Service', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-maroon-gradient text-ivory-50 relative overflow-hidden">
      <div className="pattern-border" />
      <div className="container-app py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Logo light />
          <p className="mt-4 text-ivory-100/70 text-sm leading-relaxed max-w-xs">
            The centralized digital wedding planning platform built for Sri Lankan couples — from Poruwa to reception.
          </p>
          <div className="flex gap-3 mt-5">
            {[FaFacebook, FaInstagram, FaTiktok, FaEnvelope].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-gold-300 mb-4 text-sm uppercase tracking-wider">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ivory-100/70 hover:text-gold-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ivory-100/50">
        © 2026 MagulaPlan. Made with ♥ in Sri Lanka.
      </div>
    </footer>
  )
}
