import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaMapMarkerAlt, FaWhatsapp, FaPhone, FaEnvelope, FaHeart,
  FaShare, FaArrowLeft, FaStore, FaShoppingBag, FaCheck,
} from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../context/ToastContext'
import { useCart } from '../context/CartContext'
import { vendorsApi } from '../services/api'

export default function VendorDetails() {
  const { id } = useParams()
  const [vendor, setVendor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const { showToast } = useToast()
  const { addItem, removeItem, isInCart } = useCart()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await vendorsApi.get(id)
        setVendor(data)
      } catch (err) {
        setError(err.message || 'Failed to load vendor details')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const toWhatsApp = (phone) => {
    if (!phone) return '#'
    const digits = phone.replace(/\D/g, '')
    const normalized = digits.startsWith('0') ? `94${digits.slice(1)}` : digits
    return `https://wa.me/${normalized}`
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: vendor?.businessName,
          text: `Check out ${vendor?.businessName} on MagulaPlan!`,
          url: window.location.href,
        })
      } catch {
        // user dismissed share sheet
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Link copied to clipboard!', 'success')
    }
  }

  if (loading) {
    return <div className="container-app py-8"><SkeletonCard /></div>
  }

  if (error || !vendor) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-charcoal/70 font-medium mb-4">{error || 'Vendor not found'}</p>
        <Link to="/vendors" className="btn-outline text-sm">
          <FaArrowLeft size={13} /> Back to vendors
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-blush-50/50 overflow-hidden">
        {vendor.imageUrl ? (
          <img src={vendor.imageUrl} alt={vendor.businessName} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-maroon-300">
            <FaStore size={64} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-transparent" />
        <Link
          to="/vendors"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white bg-charcoal/40 backdrop-blur-md px-3.5 py-1.5 rounded-full transition-colors"
        >
          <FaArrowLeft size={12} /> Back
        </Link>
      </div>

      <div className="container-app -mt-20 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 sm:p-10 shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                <Badge variant="blush">{vendor.categoryName || 'Vendor'}</Badge>
                {vendor.verified && <Badge variant="sage">Verified</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-charcoal">{vendor.businessName}</h1>
              {vendor.districtLocation && (
                <p className="flex items-center gap-1.5 text-charcoal/55 text-sm mt-2">
                  <FaMapMarkerAlt className="text-sage-600" size={13} /> {vendor.districtLocation}
                </p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setSaved((s) => !s)}
                aria-label={saved ? 'Remove from saved' : 'Save vendor'}
                className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors ${
                  saved ? 'bg-blush-100 border-blush-300 text-maroon-600' : 'border-charcoal/10 text-charcoal/40 hover:bg-blush-50/50 hover:text-maroon-600'
                }`}
              >
                <FaHeart size={15} />
              </button>
              <button
                onClick={handleShare}
                aria-label="Share"
                className="h-10 w-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:bg-blush-50/50 hover:text-maroon-600 transition-colors"
              >
                <FaShare size={14} />
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            {vendor.startingPrice != null && (
              <div className="inline-flex items-baseline gap-2 bg-blush-50 border border-blush-200/80 rounded-lg px-5 py-3">
                <span className="text-xs font-medium text-charcoal/60 uppercase tracking-wide">Starting from</span>
                <span className="text-2xl font-bold text-maroon-800">Rs. {(Number(vendor.startingPrice) || 0).toLocaleString()}</span>
              </div>
            )}
            <button
              onClick={() => {
                const vendorId = vendor.vendorId ?? vendor.id
                return isInCart(vendorId) ? removeItem(vendorId) : addItem(vendor)
              }}
              className={isInCart(vendor.vendorId ?? vendor.id) ? 'btn-outline' : 'btn-primary'}
            >
              {isInCart(vendor.vendorId ?? vendor.id) ? <><FaCheck size={13} /> Added to Selections</> : <><FaShoppingBag size={13} /> Add to Selections</>}
            </button>
          </div>

          {/* About */}
          {vendor.description && (
            <div className="mt-8 pt-8 border-t border-charcoal/5">
              <h2 className="text-lg font-semibold text-charcoal mb-3">About</h2>
              <p className="text-charcoal/70 leading-relaxed text-sm sm:text-base">{vendor.description}</p>
            </div>
          )}

          {/* Contact */}
          <div className="mt-8 pt-8 border-t border-charcoal/5">
            <h2 className="text-lg font-semibold text-charcoal mb-4">Contact & Enquiries</h2>
            <div className="flex flex-wrap gap-3">
              {vendor.contactPhone && (
                <>
                  <a href={`tel:${vendor.contactPhone}`} className="btn-outline text-sm py-2.5">
                    <FaPhone size={13} className="text-sage-600" /> Call Vendor
                  </a>
                  <a
                    href={toWhatsApp(vendor.contactPhone)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 hover:bg-[#1EBE5A] transition-colors shadow-xs"
                  >
                    <FaWhatsapp size={15} /> WhatsApp
                  </a>
                </>
              )}
              {vendor.contactEmail && (
                <a href={`mailto:${vendor.contactEmail}`} className="btn-outline text-sm py-2.5">
                  <FaEnvelope size={13} className="text-maroon-600" /> Email
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
