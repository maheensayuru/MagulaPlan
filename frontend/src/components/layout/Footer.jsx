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
    <footer className="bg-charcoal text-ivory-50 relative overflow-hidden">
      <div className="pattern-border" />
      <div className="container-app py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Logo light />
          <p className="mt-5 text-ivory-100/60 text-sm leading-relaxed max-w-xs">
            The centralized digital wedding planning platform built for Sri Lankan couples — from Poruwa to reception.
          </p>
          <div className="flex gap-3 mt-6">
            {[FaFacebook, FaInstagram, FaTiktok, FaEnvelope].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-500 hover:text-gold-400 transition-colors"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-medium text-gold-400/90 mb-5 text-[11px] uppercase tracking-[0.24em]">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ivory-100/60 hover:text-gold-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ivory-100/40 tracking-wide">
        © 2026 MagulaPlan. Made with ♥ in Sri Lanka.
      </div>
    </footer>
  )
}
