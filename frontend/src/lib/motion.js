// Shared motion primitives. Defined once, reused across pages for a
// consistent, restrained set of entrance animations.

export const easeOut = [0.16, 1, 0.3, 1]
export const easeInOut = [0.65, 0, 0.35, 1]

export const viewportOnce = { once: true, margin: '-80px' }

// Fade + rise: the base "content entering" motion for cards, sections, images.
export const riseIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

// Wraps a group of children (e.g. a grid) and staggers their entrance.
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// Splits a heading into words for a staggered reveal.
export const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

export const wordItem = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

// Cross-fade + gentle scale used for route transitions.
export const pageTransition = {
  initial: { opacity: 0, scale: 0.985 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.3, ease: easeInOut } },
}
