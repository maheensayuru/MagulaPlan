import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStore, FaArrowLeft } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import FormField from '../components/ui/FormField'
import Select from '../components/ui/Select'
import { useToast } from '../context/ToastContext'
import { vendorsApi, categoriesApi } from '../services/api'

const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Matara', 'Kurunegala',
  'Jaffna', 'Anuradhapura', 'Ratnapura', 'Badulla', 'Nuwara Eliya', 'Other',
]

const emptyForm = {
  businessName: '',
  categoryId: '',
  districtLocation: '',
  contactPhone: '',
  contactEmail: '',
  startingPrice: '',
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
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'Business name is required'
    if (!form.categoryId) errs.categoryId = 'Category is required'
    if (!form.districtLocation) errs.districtLocation = 'District is required'
    if (!form.contactPhone.trim()) errs.contactPhone = 'Contact phone is required'
    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) errs.contactEmail = 'Enter a valid email'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await vendorsApi.create({
        categoryId: Number(form.categoryId),
        businessName: form.businessName,
        description: form.description,
        districtLocation: form.districtLocation,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
        startingPrice: form.startingPrice === '' ? 0 : Number(form.startingPrice),
      })
      showToast('Your business has been listed!', 'success')
      navigate('/vendors')
    } catch (err) {
      showToast(err.message || 'Failed to submit', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory-radial py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-maroon-500 mb-6">
          <FaArrowLeft size={13} /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-8 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-11 w-11 rounded-full bg-gold-50 flex items-center justify-center">
              <FaStore size={18} className="text-gold-600" />
            </div>
            <Logo />
          </div>
          <h1 className="text-2xl font-display font-bold text-charcoal mt-4">List your business</h1>
          <p className="text-charcoal/50 text-sm mt-1 mb-8">Join the MagulaPlan vendor directory and reach engaged couples.</p>

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

            <FormField label="Description" htmlFor="description">
              <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Tell couples about your services..." className="input-field resize-none" />
            </FormField>

            <button type="submit" disabled={saving} className="btn-primary w-full">
              {saving ? 'Submitting...' : 'List my business'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
