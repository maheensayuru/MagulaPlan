import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaStore, FaArrowLeft, FaImage, FaCheck, FaCrown,
  FaCheckCircle, FaLock, FaCreditCard, FaShieldAlt
} from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import FormField from '../components/ui/FormField'
import Select from '../components/ui/Select'
import Modal from '../components/ui/Modal'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { vendorsApi, categoriesApi, setToken, setUserId } from '../services/api'
import { DISTRICTS } from '../constants/districts'

const districts = [...DISTRICTS, 'Other']

const PRESET_IMAGES = [
  {
    id: 'venue',
    label: 'Grand Ballroom & Venue',
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'resort',
    label: 'Luxury Scenic Resort',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'photo',
    label: 'Candid Wedding Photography',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'couple',
    label: 'Editorial Couple Portrait',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'floral',
    label: 'Luxury Flora & Poruwa Backdrops',
    url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'poruwa',
    label: 'Traditional Poruwa & Rituals',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'catering',
    label: 'Gourmet Catering & Banquets',
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'beauty',
    label: 'Bridal Beauty & Salon',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'music',
    label: 'Live Wedding Band & Entertainment',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'car',
    label: 'Classic Wedding Transport',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop',
  },
]

const emptyForm = {
  businessName: '',
  categoryId: '',
  districtLocation: '',
  contactPhone: '',
  contactEmail: '',
  startingPrice: '',
  imageUrl: PRESET_IMAGES[0].url,
  description: '',
  password: '',
}

export default function VendorRegistration() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { login } = useAuth()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [selectedPlan, setSelectedPlan] = useState('PRO') // 'FREE' | 'PRO' | 'FEATURED'
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  // Demo Sandbox Payment Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [simulatingPayment, setSimulatingPayment] = useState(false)

  useEffect(() => {
    categoriesApi.list()
      .then((data) => setCategories(data.map((c) => ({ value: String(c.categoryId), label: c.categoryName }))))
      .catch(() => showToast('Failed to load categories', 'error'))
  }, [showToast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'Business name is required'
    if (!form.categoryId) errs.categoryId = 'Please select a category'
    if (!form.districtLocation) errs.districtLocation = 'Please select a district'
    if (!form.contactPhone.trim()) errs.contactPhone = 'Contact phone is required'
    if (!form.contactEmail.trim()) {
      errs.contactEmail = 'Contact email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) {
      errs.contactEmail = 'Invalid email address'
    }
    if (!form.password || form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters for vendor portal access'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const executeRegistration = async () => {
    setSaving(true)
    try {
      const payload = {
        ...form,
        startingPrice: form.startingPrice ? Number(form.startingPrice) : undefined,
        subscriptionTier: selectedPlan,
        paymentStatus: 'PAID',
      }
      const response = await vendorsApi.register(payload)

      // Auto-authenticate vendor if token was returned
      if (response?.sessionToken) {
        setToken(response.sessionToken, true)
        if (response.userId) setUserId(response.userId, true)
      } else if (form.contactEmail && form.password) {
        try {
          await login(form.contactEmail, form.password, true)
        } catch {
          // fallback
        }
      }

      showToast(`Registration submitted! Welcome to your ${selectedPlan} Vendor Dashboard.`, 'success')
      navigate('/vendor/dashboard')
    } catch (err) {
      showToast(err.message || 'Registration failed. Please try again.', 'error')
    } finally {
      setSaving(false)
      setShowPaymentModal(false)
      setSimulatingPayment(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    if (selectedPlan === 'FREE') {
      executeRegistration()
    } else {
      setShowPaymentModal(true)
    }
  }

  const handleConfirmPayment = async () => {
    setSimulatingPayment(true)
    // Small realistic simulation delay
    setTimeout(() => {
      executeRegistration()
    }, 600)
  }

  return (
    <div className="min-h-screen bg-ivory-100 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-maroon-700 mb-6">
          <FaArrowLeft size={13} /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-8 sm:p-10 border-blush-200/60 shadow-md space-y-8"
        >
          {/* Form Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-lg bg-blush-100 flex items-center justify-center border border-blush-200">
                <FaStore size={18} className="text-maroon-700" />
              </div>
              <Logo />
            </div>
            <span className="section-eyebrow mb-2">Commercial Vendor Marketplace</span>
            <h1 className="text-2xl sm:text-3xl font-display font-semibold text-charcoal">Host Your Wedding Business</h1>
            <p className="text-charcoal/60 text-sm mt-1">
              Connect with engaged couples across Sri Lanka, showcase your portfolio, and receive direct WhatsApp inquiries and booking leads.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Business Details */}
            <div className="space-y-4">
              <h2 className="text-base font-display font-semibold text-charcoal flex items-center gap-2 border-b border-charcoal/8 pb-2">
                <span>1. Business Information</span>
              </h2>

              <FormField label="Business Name *" htmlFor="businessName" error={errors.businessName}>
                <input
                  id="businessName"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Studio Elegance / Cinnamon Grand"
                  className="input-field"
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Category *"
                  id="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  options={categories}
                  placeholder="Select a category"
                  error={errors.categoryId}
                  required
                />

                <FormField label="District Location *" htmlFor="districtLocation" error={errors.districtLocation}>
                  <select
                    id="districtLocation"
                    name="districtLocation"
                    value={form.districtLocation}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a district</option>
                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Contact Phone *" htmlFor="contactPhone" error={errors.contactPhone}>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    placeholder="0771234567"
                    className="input-field"
                  />
                </FormField>
                <FormField label="Contact / Login Email *" htmlFor="contactEmail" error={errors.contactEmail}>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={handleChange}
                    placeholder="hello@studio.lk"
                    className="input-field"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Starting Price (LKR)" htmlFor="startingPrice">
                  <input
                    id="startingPrice"
                    name="startingPrice"
                    type="number"
                    min="0"
                    value={form.startingPrice}
                    onChange={handleChange}
                    placeholder="150000"
                    className="input-field"
                  />
                </FormField>

                <FormField label="Vendor Portal Password *" htmlFor="password" error={errors.password}>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={12} />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="input-field pl-10"
                    />
                  </div>
                </FormField>
              </div>

              {/* Cover Photo */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-charcoal/80 block">
                  Vendor Cover Photo & Portfolio Image
                </label>

                {form.imageUrl && (
                  <div className="relative h-44 w-full rounded-lg overflow-hidden border border-blush-200 bg-charcoal/5 shadow-inner">
                    <img
                      src={form.imageUrl}
                      alt="Profile Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.src = PRESET_IMAGES[0].url }}
                    />
                    <span className="absolute bottom-2 right-2 bg-charcoal/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-xs font-medium">
                      Live Image Preview
                    </span>
                  </div>
                )}

                <p className="text-xs text-charcoal/50 font-medium">Choose a wedding category photo or enter a custom link:</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_IMAGES.map((img) => {
                    const selected = form.imageUrl === img.url
                    return (
                      <button
                        type="button"
                        key={img.id}
                        onClick={() => setForm((f) => ({ ...f, imageUrl: img.url }))}
                        className={`group relative rounded-md overflow-hidden border-2 transition-all text-left h-20 ${
                          selected ? 'border-maroon-700 ring-2 ring-maroon-700/20' : 'border-transparent hover:border-charcoal/30 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1.5">
                          <span className="text-[10px] text-white font-medium line-clamp-1 leading-tight">{img.label}</span>
                        </div>
                        {selected && (
                          <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-maroon-700 text-white flex items-center justify-center shadow-xs">
                            <FaCheck size={8} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <FormField label="Or Custom Image URL" htmlFor="imageUrl">
                  <div className="relative">
                    <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/..."
                      className="input-field pl-11 text-xs"
                    />
                  </div>
                </FormField>
              </div>

              <FormField label="Business Description" htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your wedding packages, photography style, or venue features..."
                  className="input-field resize-none"
                />
              </FormField>
            </div>

            {/* Step 2: Commercial Plan Selection */}
            <div className="space-y-4 pt-4 border-t border-charcoal/8">
              <h2 className="text-base font-display font-semibold text-charcoal flex items-center justify-between border-b border-charcoal/8 pb-2">
                <span>2. Select Hosting & Subscription Plan</span>
                <span className="text-xs font-normal text-charcoal/50">Commercial Listing Tiers</span>
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Free Plan */}
                <div
                  onClick={() => setSelectedPlan('FREE')}
                  className={`card p-4 cursor-pointer border-2 transition-all relative flex flex-col justify-between ${
                    selectedPlan === 'FREE' ? 'border-maroon-700 ring-2 ring-maroon-700/10 bg-blush-50/20' : 'border-charcoal/10 hover:border-charcoal/20'
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal">Free Tier</h3>
                    <p className="text-xs text-charcoal/50">Standard listing</p>
                    <div className="my-2.5">
                      <span className="text-xl font-bold text-charcoal">LKR 0</span>
                      <span className="text-[11px] text-charcoal/50"> / mo</span>
                    </div>
                    <ul className="text-[11px] space-y-1.5 text-charcoal/70">
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-sage-600 shrink-0" /> Directory listing</li>
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-sage-600 shrink-0" /> Standard inquiries</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-2 border-t border-charcoal/5 text-center">
                    <span className={`text-[11px] font-bold ${selectedPlan === 'FREE' ? 'text-maroon-700' : 'text-charcoal/40'}`}>
                      {selectedPlan === 'FREE' ? '✓ Selected' : 'Select Free'}
                    </span>
                  </div>
                </div>

                {/* Pro Plan */}
                <div
                  onClick={() => setSelectedPlan('PRO')}
                  className={`card p-4 cursor-pointer border-2 transition-all relative flex flex-col justify-between ${
                    selectedPlan === 'PRO' ? 'border-maroon-700 ring-2 ring-maroon-700/15 bg-blush-50/40' : 'border-indigo-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-maroon-700 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Recommended
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal">Pro Verified</h3>
                    <p className="text-xs text-charcoal/50">High conversion</p>
                    <div className="my-2.5">
                      <span className="text-xl font-bold text-charcoal">LKR 2,500</span>
                      <span className="text-[11px] text-charcoal/50"> / mo</span>
                    </div>
                    <ul className="text-[11px] space-y-1.5 text-charcoal/70">
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-sage-600 shrink-0" /> Verified Blue Checkmark</li>
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-sage-600 shrink-0" /> Priority WhatsApp display</li>
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-sage-600 shrink-0" /> Cart checkout leads portal</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-2 border-t border-charcoal/5 text-center">
                    <span className={`text-[11px] font-bold ${selectedPlan === 'PRO' ? 'text-maroon-700' : 'text-charcoal/40'}`}>
                      {selectedPlan === 'PRO' ? '✓ Selected' : 'Select Pro'}
                    </span>
                  </div>
                </div>

                {/* Featured Plan */}
                <div
                  onClick={() => setSelectedPlan('FEATURED')}
                  className={`card p-4 cursor-pointer border-2 transition-all relative flex flex-col justify-between ${
                    selectedPlan === 'FEATURED' ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/30' : 'border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal flex items-center gap-1">
                      <FaCrown size={12} className="text-amber-500" /> Featured Gold
                    </h3>
                    <p className="text-xs text-charcoal/50">Luxury top ranking</p>
                    <div className="my-2.5">
                      <span className="text-xl font-bold text-charcoal">LKR 5,000</span>
                      <span className="text-[11px] text-charcoal/50"> / mo</span>
                    </div>
                    <ul className="text-[11px] space-y-1.5 text-charcoal/70">
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-amber-600 shrink-0" /> Top-of-category rank</li>
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-amber-600 shrink-0" /> Home page showcase</li>
                      <li className="flex items-center gap-1.5"><FaCheck size={9} className="text-amber-600 shrink-0" /> Gold badge + Verified check</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-2 border-t border-charcoal/5 text-center">
                    <span className={`text-[11px] font-bold ${selectedPlan === 'FEATURED' ? 'text-amber-800' : 'text-charcoal/40'}`}>
                      {selectedPlan === 'FEATURED' ? '✓ Selected' : 'Select Featured'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary w-full py-3.5 text-base shadow-md font-semibold"
              >
                {saving
                  ? 'Submitting Business Details...'
                  : selectedPlan === 'FREE'
                  ? 'Submit Free Listing for Review'
                  : `Proceed to Payment & Listing (LKR ${selectedPlan === 'FEATURED' ? '5,000' : '2,500'})`}
              </button>
              <p className="text-center text-xs text-charcoal/40 mt-2">
                By submitting, you agree to MagulaPlan's Vendor Listing Terms and Directory Guidelines.
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Demo Sandbox Payment Modal */}
      <Modal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Simulated Commercial Payment"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
            <p className="font-bold flex items-center gap-1.5 text-indigo-950">
              <FaShieldAlt size={13} className="text-indigo-600" /> Academic Sandbox Payment Gateway
            </p>
            <p className="mt-1 leading-relaxed opacity-90">
              This sandbox environment simulates vendor payment processing for the <strong>{selectedPlan} Plan</strong> without live credit card charges.
            </p>
          </div>

          <div className="card p-4 bg-charcoal/[0.02] border-charcoal/10 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-charcoal">
              <span>Selected Tier:</span>
              <span className="text-maroon-700 font-bold">{selectedPlan} Commercial Listing</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Billing Cycle:</span>
              <span>Monthly Subscription</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Total Commercial Fee:</span>
              <span className="font-bold text-charcoal">
                {selectedPlan === 'FEATURED' ? 'LKR 5,000.00' : 'LKR 2,500.00'}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-charcoal/70 block mb-1">Sandbox Test Card Number</label>
              <input
                readOnly
                value="4242 •••• •••• 4242"
                className="input-field text-xs bg-gray-50 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-charcoal/70 block mb-1">Expiry Date</label>
                <input readOnly value="12 / 28" className="input-field text-xs bg-gray-50 font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal/70 block mb-1">Security CVC</label>
                <input readOnly value="•••" className="input-field text-xs bg-gray-50 font-mono" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-charcoal/70 block mb-1">Cardholder Name</label>
              <input
                readOnly
                value={form.businessName || 'Business Owner'}
                className="input-field text-xs bg-gray-50 font-medium text-charcoal"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="btn-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={simulatingPayment}
              onClick={handleConfirmPayment}
              className="btn-primary text-xs shadow-xs"
            >
              {simulatingPayment ? 'Simulating Card Transaction...' : `Simulate Successful Payment (LKR ${selectedPlan === 'FEATURED' ? '5,000' : '2,500'})`}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
