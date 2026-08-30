import CountUp from './CountUp'

export default function StatCard({ icon: Icon, label, value, suffix = '', prefix = '', color = 'maroon', display }) {
  const colors = {
    maroon: 'bg-blush-100 text-maroon-700',
    gold: 'bg-blush-100 text-maroon-700',
    sage: 'bg-sage-100 text-sage-700',
    emerald: 'bg-sage-100 text-sage-700',
    ink: 'bg-charcoal/5 text-charcoal',
  }
  return (
    <div className="card card-hover p-5 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl2 flex items-center justify-center shrink-0 ${colors[color] || colors.maroon}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-charcoal">
          {display ?? <CountUp to={value} suffix={suffix} prefix={prefix} />}
        </p>
        <p className="text-sm text-charcoal/50">{label}</p>
      </div>
    </div>
  )
}
