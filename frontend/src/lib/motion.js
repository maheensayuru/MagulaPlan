// Shared motion primitives for the redesign. Defined once and reused across
// pages so the site has a small, consistent set of signature interactions
// instead of one-off animations per section.
import { useRef } from 'react'

export const easeOut = [0.16, 1, 0.3, 1]
export const easeInOut = [0.65, 0, 0.35, 1]

export const viewportOnce = { once: true, margin: '-80px' }

// Fade + rise, the base "content entering" motion used on cards, sections, images.
export const riseIn = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

// Wraps a group of children (e.g. a grid) and staggers their entrance.
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// Splits a heading into words for a staggered reveal. Use with <RevealHeading>.
export const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

export const wordItem = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

// Cross-fade + gentle scale used for route transitions, refined from a plain fade/slide.
export const pageTransition = {
  initial: { opacity: 0, scale: 0.985 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.3, ease: easeInOut } },
}

// SVG line-draw, for the dividers/ornament strokes.
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: easeInOut } },
}

// Subtle magnetic pull toward the cursor for primary CTAs. Returns handlers +
// a ref to spread onto the element; strength controls the max pixel offset.
export function useMagneticHover(strength = 14) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return { ref, onMouseMove, onMouseLeave }
}
