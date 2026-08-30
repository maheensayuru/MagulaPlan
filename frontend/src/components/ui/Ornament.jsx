// Decorative elements: Storybook Romance & Modern Editorial

// A simplified line-art lotus rendered as static SVG
export function LotusMark({ className = 'h-8 w-8 text-maroon-600' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 6C24 6 15 16 15 25C15 31 19 36 24 36C29 36 33 31 33 25C33 16 24 6 24 6Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M11 20C11 20 8 27 12 32C15 35.5 20 35 22 32"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M37 20C37 20 40 27 36 32C33 35.5 28 35 26 32"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

// A hairline divider with a small diamond centered between two lines
export function SectionDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-14 bg-blush-300" />
      <span className="h-1.5 w-1.5 rotate-45 bg-maroon-500" />
      <span className="h-px w-14 bg-blush-300" />
    </div>
  )
}

// Editorial intro label: a short horizontal rule beside tracked text
export function EditorialEyebrow({ children, className = '', tone = 'ink' }) {
  const toneClass = tone === 'light' ? 'text-white/80' : 'text-maroon-700'
  const lineClass = tone === 'light' ? 'bg-white/40' : 'bg-maroon-400'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-8 ${lineClass}`} />
      <span className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${toneClass}`}>{children}</span>
    </div>
  )
}
