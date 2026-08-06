import { motion } from 'framer-motion'
import { FaGem } from 'react-icons/fa'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <span className={`section-eyebrow mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <FaGem size={10} /> {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-4">{title}</h2>
      {subtitle && <p className="text-charcoal/60 text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
