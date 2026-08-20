import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Tabs({ tabs, defaultTab, onChange }) {
  const [active, setActive] = useState(defaultTab || tabs[0].id)

  const select = (id) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <div role="tablist" className="flex gap-1 bg-charcoal/5 rounded-full p-1 w-fit overflow-x-auto max-w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => select(tab.id)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === tab.id ? 'text-white' : 'text-charcoal/60 hover:text-charcoal'
          }`}
        >
          {active === tab.id && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 bg-gold-700 rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
