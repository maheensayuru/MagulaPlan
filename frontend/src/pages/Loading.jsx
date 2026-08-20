import { motion } from 'framer-motion'
import { LotusMark } from '../components/ui/Ornament'

// A general-purpose full-page loading state, used while a page's own
// defensive API calls are in flight (see Profile/Settings/Notifications).
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}>
        <LotusMark className="h-10 w-10 text-gold-500" />
      </motion.div>
      <p className="text-sm text-charcoal/50 tracking-wide">Preparing your wedding plans...</p>
    </div>
  )
}
