import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Tabs({ tabs, defaultTab, onChange }) {
  const [active, setActive] = useState(defaultTab || tabs[0].id)
  const tabRefs = useRef([])

  const select = (id) => {
    setActive(id)
    onChange?.(id)
  }

  // ARIA tabs pattern: arrow keys move selection, Home/End jump to the ends.
  // Only the active tab is in the tab order (roving tabindex).
  const onKeyDown = (e, index) => {
    let next = -1
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    if (next >= 0) {
      e.preventDefault()
      select(tabs[next].id)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <div role="tablist" className="flex gap-1 bg-charcoal/5 rounded-full p-1 w-fit overflow-x-auto max-w-full">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => (tabRefs.current[i] = el)}
          role="tab"
          aria-selected={active === tab.id}
          tabIndex={active === tab.id ? 0 : -1}
          onClick={() => select(tab.id)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === tab.id ? 'text-white' : 'text-charcoal/60 hover:text-charcoal'
          }`}
        >
          {active === tab.id && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 bg-maroon-700 rounded-full -z-10 shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
