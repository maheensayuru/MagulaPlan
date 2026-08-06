import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaStar, FaMapMarkerAlt, FaCheckCircle, FaWhatsapp, FaPhone, FaHeart,
  FaShare, FaChevronLeft, FaChevronRight, FaCheck,
} from 'react-icons/fa'
import { vendors } from '../data/mockData'
import Badge from '../components/ui/Badge'
import Tabs from '../components/ui/Tabs'
import { useToast } from '../context/ToastContext'

const reviews = [
  { name: 'Kavindi S.', rating: 5, text: 'Absolutely stunning work — the whole team was professional and punctual. Highly recommend!', date: '2 weeks ago' },
  { name: 'Ruwan P.', rating: 5, text: 'Exceeded our expectations. Great communication throughout the entire planning process.', date: '1 month ago' },
  { name: 'Ishara D.', rating: 4, text: 'Beautiful results, though it took a little longer than expected to receive the final delivery.', date: '2 months ago' },
]

export default function VendorDetails() {
  const { id } = useParams()
  const vendor = vendors.find((v) => v.id === id) || vendors[0]
  const [activeImage, setActiveImage] = useState(0)
  const [tab, setTab] = useState('overview')
  const [saved, setSaved] = useState(false)
  const { showToast } = useToast()

  return (
    <div className="bg-ivory-100 min-h-screen pb-16">
      {/* Gallery */}
      <div className="relative h-72 sm:h-96 bg-charcoal overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={vendor.gallery[activeImage]}
            alt={`${vendor.name} gallery ${activeImage + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        <button
          onClick={() => setActiveImage((i) => (i - 1 + vendor.gallery.length) % vendor.gallery.length)}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white"
        >
          <FaChevronLeft size={14} />
        </button>
        <button
          onClick={() => setActiveImage((i) => (i + 1) % vendor.gallery.length)}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white"
        >
          <FaChevronRight size={14} />
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {vendor.gallery.map((_, i) => (
            <button
              key={i}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActiveImage(i)}
              className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/60'}`}
            />
          ))}
        </div>
      </div>

      <div className="container-app -mt-16 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">{vendor.name}</h1>
                {vendor.verified && <FaCheckCircle className="text-emerald-500" title="Verified vendor" />}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal/60 mb-3">
                <span className="flex items-center gap-1"><FaStar className="text-gold-500" /> {vendor.rating} ({vendor.reviews} reviews)</span>
                <span className="flex items-center gap-1"><FaMapMarkerAlt /> {vendor.district}, Sri Lanka</span>
                <Badge variant="maroon">{vendor.categoryName}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {vendor.tags.map((t) => <Badge key={t} variant="gold">{t}</Badge>)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setSaved((s) => !s)}
                aria-label="Save vendor"
                className="h-11 w-11 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal/5"
              >
                <FaHeart className={saved ? 'text-maroon-500' : 'text-charcoal/30'} />
              </button>
              <button
                onClick={() => showToast('Link copied to clipboard', 'info')}
                aria-label="Share vendor"
                className="h-11 w-11 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal/5"
              >
                <FaShare className="text-charcoal/50" size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 mt-6">
          <div className="space-y-6">
            <div className="card p-6">
              <Tabs
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'packages', label: 'Packages' },
                  { id: 'reviews', label: `Reviews (${reviews.length})` },
                ]}
                defaultTab="overview"
                onChange={setTab}
              />

              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-6">
                  {tab === 'overview' && (
                    <div>
                      <p className="text-charcoal/70 leading-relaxed mb-6">{vendor.description}</p>
                      <div className="grid grid-cols-3 gap-3">
                        {vendor.gallery.slice(0, 6).map((img, i) => (
                          <img key={i} src={img} alt="" className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveImage(i)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 'packages' && (
                    <div className="grid sm:grid-cols-3 gap-4">
                      {vendor.packages.map((pkg, i) => (
                        <motion.div
                          key={pkg.name}
                          whileHover={{ y: -4 }}
                          className={`rounded-xl2 border p-5 ${i === 1 ? 'border-gold-400 shadow-gold relative' : 'border-charcoal/10'}`}
                        >
                          {i === 1 && <Badge variant="gold" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                          <h4 className="font-display font-semibold text-charcoal mb-1">{pkg.name}</h4>
                          <p className="text-xl font-bold text-maroon-600 mb-4">Rs. {pkg.price.toLocaleString()}</p>
                          <ul className="space-y-2 mb-5">
                            {pkg.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-charcoal/60">
                                <FaCheck className="text-emerald-500 mt-1 shrink-0" size={10} /> {f}
                              </li>
                            ))}
                          </ul>
                          <button onClick={() => showToast(`${pkg.name} package inquiry sent!`, 'success')} className="btn-outline w-full text-sm py-2">Choose Package</button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {tab === 'reviews' && (
                    <div className="space-y-5">
                      {reviews.map((r, i) => (
                        <div key={i} className="border-b border-charcoal/5 pb-5 last:border-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-charcoal text-sm">{r.name}</p>
                            <span className="text-xs text-charcoal/40">{r.date}</span>
                          </div>
                          <div className="flex text-gold-500 gap-0.5 mb-2">
                            {Array.from({ length: 5 }).map((_, j) => <FaStar key={j} size={11} className={j < r.rating ? '' : 'text-charcoal/10'} />)}
                          </div>
                          <p className="text-sm text-charcoal/60 leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6 sticky top-24">
              <p className="text-sm text-charcoal/50 mb-1">Starting from</p>
              <p className="text-2xl font-display font-bold text-maroon-600 mb-5">Rs. {vendor.priceFrom.toLocaleString()}</p>
              <a
                href={`https://wa.me/${vendor.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full mb-3 bg-emerald-500 hover:bg-emerald-600"
              >
                <FaWhatsapp size={16} /> Message on WhatsApp
              </a>
              <a href={`tel:${vendor.phone}`} className="btn-outline w-full">
                <FaPhone size={13} /> {vendor.phone}
              </a>
              <div className="mt-5 pt-5 border-t border-charcoal/8">
                <p className="text-sm font-semibold text-charcoal mb-2 flex items-center gap-2"><FaMapMarkerAlt className="text-maroon-500" size={13} /> Location</p>
                <div className="h-32 rounded-xl bg-charcoal/5 flex items-center justify-center text-xs text-charcoal/40">
                  Map preview — {vendor.district}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
