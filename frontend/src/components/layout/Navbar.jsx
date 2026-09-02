import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa'
import Logo from './Logo'
import { useCart } from '../../context/CartContext'

const links = [
  { href: '/vendors', label: 'Vendors', isRoute: true },
  { href: '#features', label: 'Features' },
  { href: '#testimonials', label: 'Stories' },
]

const DRAWER_CLOSE_MS = 300

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count, setOpen: setCartOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMobileNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, DRAWER_CLOSE_MS)
  }

  // At the very top of the landing page the navbar floats over the hero video,
  // so links use a light treatment; once scrolled it becomes the solid bar.
  const linkClass = scrolled
    ? 'text-sm font-medium text-charcoal/70 transition-colors hover:text-maroon-700'
    : 'text-sm font-medium text-ivory-50/85 transition-colors hover:text-white'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blush-100' : 'bg-transparent'
      }`}
    >
      <nav className="container-app flex items-center justify-between h-16">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.isRoute ? (
              <Link key={l.href} to={l.href} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className={scrolled ? 'btn-ghost' : 'btn-ghost !text-ivory-50/85 hover:!text-white'}>
            Log in
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className={`relative h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
              scrolled
                ? 'text-charcoal/70 hover:bg-blush-50 hover:text-maroon-700'
                : 'text-ivory-50/85 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FaShoppingBag size={16} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-maroon-700 text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link to="/register" className="btn-primary">
            Get started
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className={`relative h-10 w-10 flex items-center justify-center rounded-full ${scrolled ? 'text-charcoal' : 'text-ivory-50'}`}
          >
            <FaShoppingBag size={17} />
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-maroon-700 text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className={`h-10 w-10 flex items-center justify-center rounded-full ${scrolled ? 'text-charcoal' : 'text-ivory-50'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DRAWER_CLOSE_MS / 1000 }}
            className="md:hidden overflow-hidden bg-white border-t border-blush-100 shadow-md"
          >
            <div className="container-app py-5 flex flex-col gap-3">
              {links.map((l) =>
                l.isRoute ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="py-2 text-charcoal/80 text-sm font-medium hover:text-maroon-700"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleMobileNavClick(e, l.href)}
                    className="py-2 text-charcoal/80 text-sm font-medium hover:text-maroon-700"
                  >
                    {l.label}
                  </a>
                ),
              )}
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline flex-1 text-center text-sm py-2.5">
                  Log in
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center text-sm py-2.5">
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
