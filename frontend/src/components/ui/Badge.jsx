const variants = {
  gold: 'bg-gold-100 text-gold-700',
  maroon: 'bg-maroon-50 text-maroon-600',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-600',
  error: 'bg-red-50 text-red-600',
  neutral: 'bg-charcoal/5 text-charcoal/70',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
