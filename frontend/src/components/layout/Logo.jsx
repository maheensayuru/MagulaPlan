import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="MagulaPlan home">
      <span className="h-9 w-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z"
            fill={light ? '#7A1F2B' : '#7A1F2B'}
          />
          <path d="M12 17V22M8 22H16" stroke="#7A1F2B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`font-display text-xl font-bold ${light ? 'text-white' : 'text-charcoal'}`}>
        Magula<span className="text-gradient-gold">Plan</span>
      </span>
    </Link>
  )
}
