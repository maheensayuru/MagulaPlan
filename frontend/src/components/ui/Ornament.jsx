import { motion } from 'framer-motion'
import { drawLine, viewportOnce } from '../../lib/motion'

// A simplified line-art lotus, echoing the mark in the MagulaPlan logo.
// Used sparingly as a section divider / watermark, never as a literal repeat of the logo.
export function LotusMark({ className = 'h-8 w-8 text-gold-500' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M24 6C24 6 15 16 15 25C15 31 19 36 24 36C29 36 33 31 33 25C33 16 24 6 24 6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={drawLine}
      />
      <motion.path
        d="M11 20C11 20 8 27 12 32C15 35.5 20 35 22 32"
        stroke="currentColor"
        strokeWidth="1.4"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={drawLine}
        transition={{ delay: 0.15 }}
      />
      <motion.path
        d="M37 20C37 20 40 27 36 32C33 35.5 28 35 26 32"
        stroke="currentColor"
        strokeWidth="1.4"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={drawLine}
        transition={{ delay: 0.15 }}
      />
    </svg>
  )
}

// A hairline divider with the lotus mark centered — replaces generic blob decoration.
export function SectionDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gold-300/60" />
      <LotusMark className="h-6 w-6 text-gold-500" />
      <span className="h-px w-16 bg-gold-300/60" />
    </div>
  )
}

// Editorial intro label: a short vertical rule beside a tracked small-caps
// eyebrow, left-aligned — the Eterna-style alternative to a centered/badged eyebrow.
export function EditorialEyebrow({ children, className = '', tone = 'ink' }) {
  const toneClass = tone === 'light' ? 'text-white/70' : 'text-gold-800/90'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-9 bg-gold-600/70" />
      <span className={`text-[11px] font-medium tracking-[0.3em] uppercase ${toneClass}`}>{children}</span>
    </div>
  )
}
