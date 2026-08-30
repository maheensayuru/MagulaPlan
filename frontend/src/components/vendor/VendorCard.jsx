import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt, FaCheckCircle, FaHeart, FaStore, FaShoppingBag, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import Badge from '../ui/Badge'
import { useCart } from '../../context/CartContext'

export default function VendorCard({ vendor, index = 0 }) {
  const [saved, setSaved] = useState(false)
  const { addItem, removeItem, isInCart } = useCart()

  const id = vendor.vendorId ?? vendor.id
  const name = vendor.businessName ?? vendor.name
  const district = vendor.districtLocation ?? vendor.district
  const price = vendor.startingPrice ?? vendor.priceFrom ?? 0
  const rating = vendor.rating
  const reviews = vendor.reviewCount ?? vendor.reviews
  const image = vendor.imageUrl ?? vendor.image

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
      className="card card-hover overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <Link to={`/vendors/${id}`}>
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-52 w-full flex items-center justify-center bg-blush-50/50 text-charcoal/20">
              <FaStore size={28} />
            </div>
          )}
        </Link>
        <button
          aria-label={saved ? 'Remove from saved' : 'Save vendor'}
          onClick={() => setSaved((s) => !s)}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
        >
          <FaHeart className={saved ? 'text-maroon-600' : 'text-charcoal/30'} size={13} />
        </button>
        {vendor.featured && (
          <span className="absolute top-3 left-3">
            <Badge variant="blush">Featured</Badge>
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-charcoal leading-snug">{name}</h3>
          {vendor.verified && <FaCheckCircle className="text-sage-600 shrink-0 mt-1" title="Verified vendor" size={14} />}
        </div>
        <p className="text-xs text-charcoal/50 mb-2">{vendor.categoryName}</p>
        <div className="flex items-center gap-3 text-sm text-charcoal/60 mb-3">
          {rating != null && (
            <span className="inline-flex items-center gap-1">
              <FaStar className="text-amber-400" size={12} /> {rating}
              {reviews != null && <span className="text-charcoal/40">({reviews})</span>}
            </span>
          )}
          {district && (
            <span className="inline-flex items-center gap-1">
              <FaMapMarkerAlt className="text-sage-600" size={11} /> {district}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-charcoal/5">
          <p className="text-sm text-charcoal/70">
            From <span className="font-semibold text-charcoal">Rs. {(Number(price) || 0).toLocaleString()}</span>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => (isInCart(id) ? removeItem(id) : addItem(vendor))}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors ${
                isInCart(id)
                  ? 'bg-maroon-700 border-maroon-700 text-white'
                  : 'border-charcoal/15 text-charcoal/70 hover:border-maroon-600 hover:text-maroon-700'
              }`}
            >
              {isInCart(id) ? <><FaCheck size={10} /> Added</> : <><FaShoppingBag size={10} /> Add</>}
            </button>
            <Link to={`/vendors/${id}`} className="text-sm font-medium text-maroon-700 hover:text-maroon-800">
              View →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
