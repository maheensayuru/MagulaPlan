import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaArrowLeft } from 'react-icons/fa'
import { riseIn } from '../lib/motion'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-ivory-radial">
      <motion.div initial="hidden" animate="show" variants={riseIn} className="text-center max-w-md">
        <div className="mx-auto h-16 w-16 rounded-xl2 bg-gold-50 flex items-center justify-center text-gold-600 mb-6 animate-float">
          <FaHeart size={26} />
        </div>
        <p className="section-eyebrow justify-center mb-3">404</p>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-charcoal mb-4">
          This page wandered off the guest list
        </h1>
        <p className="text-charcoal/60 mb-8">
          The page you're looking for doesn't exist, or the link may be out of date.
        </p>
        <Link to="/" className="btn-primary">
          <FaArrowLeft size={13} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
