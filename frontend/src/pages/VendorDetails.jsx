import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaStar, FaMapMarkerAlt, FaWhatsapp, FaPhone, FaEnvelope, FaHeart,
  FaShare, FaArrowLeft, FaStore,
} from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../context/ToastContext'
import { vendorsApi } from '../services/api'

export default function VendorDetails() {
  const { id } = useParams()
  const [vendor, setVendor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await vendorsApi.byId(id)
        setVendor(data)
      } catch (e) {
        setError(e.message || 'Failed to load vendor')
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
    if (!vendor) return
    const url = window.location.href
    const text = `${vendor.businessName} — ${vendor.categoryName || ''} vendor in ${vendor.districtLocation || 'Sri Lanka'}. Starting from Rs. ${(Number(vendor.startingPrice) || 0).toLocaleString()}.`
    try {
      if (navigator.share) {
        await navigator.share({ title: vendor.businessName, text, url })
      } else {
        await navigator.clipboard.writeText(url)
        showToast('Vendor link copied!', 'success')
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return
      showToast('Failed to share', 'error')
    }
  }

  if (loading) {
    return <div className="container-app py-8"><SkeletonCard /></div>
  }

  if (error || !vendor) {
    return (
      <div className="container-app py-8">
        <div className="card p-12 text-center">
          <p className="text-charcoal/70 font-medium">{error || 'Vendor not found'}</p>
          <Link to="/vendors" className="btn-outline text-sm mt-4 inline-flex"><FaArrowLeft size={13} /> Back to directory</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ivory-100 min-h-screen pb-16">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 bg-charcoal overflow-hidden">
        <img
          src={vendor.imageUrl || `https://picsum.photos/seed/vendor-${vendor.vendorId}/1200/600`}
          alt={vendor.businessName}
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      </div>

      <div className="container-app -mt-16 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="gold">{vendor.categoryName || 'Vendor'}</Badge>
                {vendor.verified && <Badge variant="success">Verified</Badge>}
              </div>
              <h1 className="text-3xl font-display font-bold text-charcoal">{vendor.businessName}</h1>
              {vendor.districtLocation && (
                <p className="flex items-center gap-1.5 text-charcoal/50 mt-2">
                  <FaMapMarkerAlt size={13} /> {vendor.districtLocation}
                </p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setSaved((s) => !s)}
                aria-label={saved ? 'Remove from saved' : 'Save vendor'}
                className="h-10 w-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:bg-charcoal/5 transition-colors"
              >
                <FaHeart className={saved ? 'text-maroon-500' : ''} size={15} />
              </button>
              <button onClick={handleShare} aria-label="Share" className="h-10 w-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:bg-charcoal/5 transition-colors">
                <FaShare size={15} />
              </button>
            </div>
          </div>

          {vendor.startingPrice != null && (
            <div className="mt-6 inline-flex items-baseline gap-2 bg-gold-50 rounded-xl px-5 py-3">
              <span className="text-sm text-charcoal/50">Starting from</span>
              <span className="text-2xl font-bold text-maroon-600">Rs. {(Number(vendor.startingPrice) || 0).toLocaleString()}</span>
            </div>
          )}

          {vendor.description && (
            <div className="mt-6">
              <h2 className="font-semibold text-charcoal mb-2">About</h2>
              <p className="text-charcoal/70 leading-relaxed">{vendor.description}</p>
            </div>
          )}

          {/* Contact */}
          <div className="mt-8">
            <h2 className="font-semibold text-charcoal mb-3">Contact</h2>
            <div className="flex flex-wrap gap-3">
              {vendor.contactPhone && (
                <>
                  <a href={`tel:${vendor.contactPhone}`} className="btn-outline text-sm py-2.5">
                    <FaPhone size={13} /> Call
                  </a>
                  <a href={toWhatsApp(vendor.contactPhone)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white font-semibold px-6 py-2.5 text-sm hover:bg-emerald-600 transition-colors">
                    <FaWhatsapp size={14} /> WhatsApp
                  </a>
                </>
              )}
              {vendor.contactEmail && (
                <a href={`mailto:${vendor.contactEmail}`} className="btn-outline text-sm py-2.5">
                  <FaEnvelope size={13} /> Email
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
