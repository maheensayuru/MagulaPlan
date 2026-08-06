import { motion } from 'framer-motion'
import CountUp from './CountUp'

export default function StatCard({ icon: Icon, label, value, suffix = '', prefix = '', color = 'maroon' }) {
  const colors = {
    maroon: 'bg-maroon-50 text-maroon-500',
    gold: 'bg-gold-100 text-gold-600',
    emerald: 'bg-emerald-50 text-emerald-500',
  }
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card card-hover p-5 flex items-center gap-4"
    >
      <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-charcoal">
          <CountUp to={value} suffix={suffix} prefix={prefix} />
        </p>
        <p className="text-sm text-charcoal/50">{label}</p>
      </div>
    </motion.div>
  )
}
