import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStore, FaArrowLeft, FaImage, FaCheck } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import FormField from '../components/ui/FormField'
import Select from '../components/ui/Select'
import { useToast } from '../context/ToastContext'
import { vendorsApi, categoriesApi } from '../services/api'
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
}
export default function VendorRegistration() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

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
    if (form.contactEmail && !/\S+@\S+\.\S+/.test(form.contactEmail)) errs.contactEmail = 'Invalid email address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await vendorsApi.register({
        ...form,
        startingPrice: form.startingPrice ? Number(form.startingPrice) : undefined,
      })
      showToast('Registration submitted! We will review your listing shortly.', 'success')
      navigate('/vendors')
    } catch (err) {
      showToast(err.message || 'Registration failed. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-maroon-700 mb-6">
          <FaArrowLeft size={13} /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-8 sm:p-10 border-blush-200/60 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-11 w-11 rounded-lg bg-blush-100 flex items-center justify-center border border-blush-200">
              <FaStore size={18} className="text-maroon-700" />
            </div>
            <Logo />
          </div>
          <span className="section-eyebrow mb-2">Join The Directory</span>
          <h1 className="text-2xl font-display font-semibold text-charcoal">List your business</h1>
          <p className="text-charcoal/50 text-sm mt-1 mb-8">Join the MagulaPlan boutique vendor directory and connect with couples across Sri Lanka.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Business name" htmlFor="businessName" error={errors.businessName}>
              <input id="businessName" name="businessName" value={form.businessName} onChange={handleChange} placeholder="Studio Elegance" className="input-field" />
            </FormField>

            <Select
              label="Category"
              id="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              options={categories}
              placeholder="Select a category"
              error={errors.categoryId}
              required
            />

            <FormField label="District" htmlFor="districtLocation" error={errors.districtLocation}>
              <select id="districtLocation" name="districtLocation" value={form.districtLocation} onChange={handleChange} className="input-field">
                <option value="">Select a district</option>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </FormField>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Contact phone" htmlFor="contactPhone" error={errors.contactPhone}>
                <input id="contactPhone" name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="0771234567" className="input-field" />
              </FormField>
              <FormField label="Contact email" htmlFor="contactEmail" error={errors.contactEmail}>
                <input id="contactEmail" name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} placeholder="hello@studio.lk" className="input-field" />
              </FormField>
            </div>

            <FormField label="Starting price (LKR)" htmlFor="startingPrice">
              <input id="startingPrice" name="startingPrice" type="number" min="0" value={form.startingPrice} onChange={handleChange} placeholder="150000" className="input-field" />
            </FormField>

            {/* Real Image Profile Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-charcoal/80 block">
                Vendor Profile & Cover Image
              </label>
              
              {/* Preview */}
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

              {/* Preset Gallery Picker */}
              <div>
                <p className="text-xs text-charcoal/50 mb-2 font-medium">Choose a real curated wedding photo or enter your custom image link below:</p>
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
              </div>

              {/* Custom Image URL Field */}
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

            <FormField label="Description" htmlFor="description">
              <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Tell couples about your services, packages, and wedding portfolio..." className="input-field resize-none" />
            </FormField>
            <button type="submit" disabled={saving} className="btn-primary w-full shadow-md">
              {saving ? 'Submitting...' : 'List my business'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
