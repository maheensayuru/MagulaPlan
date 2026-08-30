const variants = {
  gold: 'bg-blush-100 text-maroon-700 border border-blush-200',
  maroon: 'bg-maroon-50 text-maroon-700 border border-maroon-100',
  blush: 'bg-blush-100 text-maroon-700 border border-blush-200',
  sage: 'bg-sage-100 text-sage-700 border border-sage-200',
  success: 'bg-sage-100 text-sage-700 border border-sage-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-600 border border-red-200',
  neutral: 'bg-charcoal/5 text-charcoal/70',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${variants[variant] || variants.neutral} ${className}`}
    >
      {children}
    </span>
  )
}
