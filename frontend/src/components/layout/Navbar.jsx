import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from './Logo'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#testimonials', label: 'Stories' },
]

// Matches the mobile drawer's exit animation duration so the page has
// finished collapsing before we scroll — otherwise the shifting layout
// throws off the landing position mid-scroll.
const DRAWER_CLOSE_MS = 300

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-card' : 'bg-transparent'
      }`}
    >
      <nav className="container-app flex items-center justify-between h-18 py-3">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-charcoal/70 transition-colors hover:text-maroon-500">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/vendors/new" className="btn-ghost text-sm">
            List your business
          </Link>
          <Link to="/login" className="btn-ghost text-sm">
            Log in
          </Link>
          <Link to="/register" className="btn-primary text-sm py-2.5">
            Get Started
          </Link>
        </div>
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-full text-charcoal"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DRAWER_CLOSE_MS / 1000 }}
            className="md:hidden overflow-hidden bg-white border-t border-charcoal/5"
          >
            <div className="container-app py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => handleMobileNavClick(e, l.href)} className="py-2 text-charcoal/80 font-medium">
                  {l.label}
                </a>
              ))}
              <Link to="/vendors/new" onClick={() => setOpen(false)} className="py-2 text-charcoal/80 font-medium">
                List your business
              </Link>
              <div className="flex gap-3 pt-2">
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline flex-1 text-sm py-2.5">
                  Log in
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 text-sm py-2.5">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
