import { motion } from 'framer-motion'

export default function ProgressBar({ value = 0, color = 'gold', height = 'h-2.5', showLabel = false }) {
  const colors = {
    gold: 'bg-gold-gradient',
    maroon: 'bg-maroon-500',
    emerald: 'bg-emerald-500',
  }
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div>
      <div className={`w-full ${height} rounded-full bg-charcoal/8 overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${colors[color]}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      {showLabel && <p className="mt-1 text-xs text-charcoal/60">{clamped}% complete</p>}
    </div>
  )
}
