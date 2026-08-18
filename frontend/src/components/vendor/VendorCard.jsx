import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt, FaCheckCircle, FaHeart } from 'react-icons/fa'
import { useState } from 'react'
import Badge from '../ui/Badge'

export default function VendorCard({ vendor, index = 0 }) {
  const [saved, setSaved] = useState(false)

  const id = vendor.vendorId ?? vendor.id
  const name = vendor.businessName ?? vendor.name
  const district = vendor.districtLocation ?? vendor.district
  const price = vendor.startingPrice ?? vendor.priceFrom ?? 0
  const rating = vendor.rating
  const reviews = vendor.reviewCount ?? vendor.reviews
  const image = vendor.imageUrl ?? vendor.image ?? `https://picsum.photos/seed/vendor-${id}/600/400`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
      whileHover={{ y: -6 }}
      className="card card-hover overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <Link to={`/vendors/${id}`}>
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <button
          aria-label={saved ? 'Remove from saved' : 'Save vendor'}
          onClick={() => setSaved((s) => !s)}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-card"
        >
          <FaHeart className={saved ? 'text-maroon-500' : 'text-charcoal/30'} size={15} />
        </button>
        {vendor.featured && (
          <span className="absolute top-3 left-3">
            <Badge variant="gold">Featured</Badge>
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-charcoal leading-snug">{name}</h3>
          {vendor.verified && <FaCheckCircle className="text-emerald-500 shrink-0 mt-1" title="Verified vendor" size={14} />}
        </div>
        <p className="text-xs text-charcoal/50 mb-2">{vendor.categoryName}</p>
        <div className="flex items-center gap-3 text-sm text-charcoal/60 mb-3">
          {rating != null && (
            <span className="flex items-center gap-1">
              <FaStar className="text-gold-500" size={13} /> {rating}
              {reviews != null && ` (${reviews})`}
            </span>
          )}
          {district && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt size={13} /> {district}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-charcoal/70">
            From <span className="font-semibold text-maroon-600">Rs. {(Number(price) || 0).toLocaleString()}</span>
          </p>
          <Link to={`/vendors/${id}`} className="text-sm font-semibold text-gold-600 hover:text-gold-700">
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
