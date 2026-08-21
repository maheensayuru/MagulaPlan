import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa'
import Logo from './Logo'
import { useCart } from '../../context/CartContext'

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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-card' : 'bg-transparent'
      }`}
    >
      <nav className="container-app flex items-center justify-between h-20 py-3">
        <Logo tagline />
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[11px] font-medium tracking-[0.16em] uppercase text-charcoal/70 transition-colors hover:text-gold-800">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-5">
          <Link to="/vendors/new" className="btn-ghost">
            List your business
          </Link>
          <Link to="/login" className="btn-ghost">
            Log in
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative h-10 w-10 flex items-center justify-center rounded-full text-charcoal/70 hover:bg-charcoal/5 transition-colors">
            <FaShoppingBag size={16} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold-700 text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link to="/register" className="btn-outline py-3">
            Get Started
          </Link>
        </div>
        <div className="md:hidden flex items-center gap-1">
          <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative h-10 w-10 flex items-center justify-center rounded-full text-charcoal">
            <FaShoppingBag size={17} />
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gold-700 text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full text-charcoal"
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
            className="md:hidden overflow-hidden bg-white border-t border-charcoal/5"
          >
            <div className="container-app py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => handleMobileNavClick(e, l.href)} className="py-2 text-charcoal/80 text-xs font-medium tracking-[0.16em] uppercase">
                  {l.label}
                </a>
              ))}
              <Link to="/vendors/new" onClick={() => setOpen(false)} className="py-2 text-charcoal/80 text-xs font-medium tracking-[0.16em] uppercase">
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
