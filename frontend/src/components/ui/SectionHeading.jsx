import { motion } from 'framer-motion'
import { riseIn, viewportOnce } from '../../lib/motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={riseIn}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <span className={`section-eyebrow mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-1 w-1 rounded-full bg-gold-500" /> {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-medium text-charcoal mb-4">{title}</h2>
      {subtitle && <p className="text-charcoal/60 text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
