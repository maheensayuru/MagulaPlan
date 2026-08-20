import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'

export default function EmptyState({ icon: Icon = FaSearch, title, subtitle, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 px-4"
    >
      <div className="h-20 w-20 rounded-xl2 bg-gold-50 flex items-center justify-center mb-5 animate-float">
        <Icon size={32} className="text-gold-600" />
      </div>
      <h3 className="text-lg font-display font-semibold text-charcoal mb-1">{title}</h3>
      {subtitle && <p className="text-charcoal/50 text-sm max-w-sm mb-5">{subtitle}</p>}
      {action}
    </motion.div>
  )
}
