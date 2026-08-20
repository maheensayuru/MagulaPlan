import { motion } from 'framer-motion'
import CountUp from './CountUp'

export default function StatCard({ icon: Icon, label, value, suffix = '', prefix = '', color = 'gold', display }) {
  const colors = {
    gold: 'bg-gold-100 text-gold-700',
    ink: 'bg-charcoal/8 text-charcoal',
    maroon: 'bg-maroon-50 text-maroon-500',
  }
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card card-hover p-5 flex items-center gap-4"
    >
      <div className={`h-12 w-12 rounded-xl2 flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-charcoal">
          {/* `display` renders static placeholder text (e.g. "X.X") for stats with no real data source yet */}
          {display ?? <CountUp to={value} suffix={suffix} prefix={prefix} />}
        </p>
        <p className="text-sm text-charcoal/50">{label}</p>
      </div>
    </motion.div>
  )
}
