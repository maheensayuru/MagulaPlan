import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaStore, FaCheckCircle, FaClock, FaTimesCircle, FaCrown,
  FaWhatsapp, FaPhone, FaEnvelope, FaEdit, FaSave, FaCreditCard,
  FaArrowLeft, FaShoppingBag, FaShieldAlt, FaExternalLinkAlt
} from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import StatCard from '../components/ui/StatCard'
import Modal from '../components/ui/Modal'
import FormField from '../components/ui/FormField'
import { SkeletonCard } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { vendorsApi } from '../services/api'
import { DISTRICTS } from '../constants/districts'

export default function VendorDashboard() {
  const { isAuthenticated, userId, logout } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [vendor, setVendor] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'leads' | 'edit' | 'plan'

  // Edit form state
  const [editForm, setEditForm] = useState({
    businessName: '',
    startingPrice: '',
    contactPhone: '',
    contactEmail: '',
    districtLocation: '',
    description: '',
    imageUrl: '',
  })
  const [saving, setSaving] = useState(false)

  // Upgrade Plan Modal
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [selectedUpgrade, setSelectedUpgrade] = useState('PRO')
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    let isMounted = true
    const loadVendorData = async () => {
      setLoading(true)
      try {
        const data = await vendorsApi.me()
        if (isMounted && data) {
          setVendor(data)
          setEditForm({
            businessName: data.businessName || '',
            startingPrice: data.startingPrice ? String(data.startingPrice) : '',
            contactPhone: data.contactPhone || '',
            contactEmail: data.contactEmail || '',
            districtLocation: data.districtLocation || '',
            description: data.description || '',
            imageUrl: data.imageUrl || '',
          })

          // Load vendor bookings
          if (data.vendorId) {
            try {
              const leads = await vendorsApi.bookings(data.vendorId)
              if (isMounted && Array.isArray(leads)) {
                setBookings(leads)
              }
            } catch {
              // bookings endpoint optional if no bookings yet
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          showToast('Could not load vendor profile. Please ensure you are logged into a vendor account.', 'error')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadVendorData()
    return () => { isMounted = false }
  }, [isAuthenticated, navigate, showToast])

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!vendor?.vendorId) return
    setSaving(true)
    try {
      const updated = await vendorsApi.update(vendor.vendorId, {
        categoryId: vendor.categoryId,
        businessName: editForm.businessName,
        districtLocation: editForm.districtLocation,
        contactPhone: editForm.contactPhone,
        contactEmail: editForm.contactEmail,
        startingPrice: editForm.startingPrice ? Number(editForm.startingPrice) : 0,
        description: editForm.description,
        imageUrl: editForm.imageUrl || vendor.imageUrl,
        subscriptionTier: vendor.subscriptionTier,
      })
      setVendor(updated)
      showToast('Business listing updated successfully!', 'success')
      setActiveTab('overview')
    } catch (err) {
      showToast(err.message || 'Failed to update listing', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleSimulateUpgrade = async () => {
    if (!vendor?.vendorId) return
    setPaying(true)
    try {
      const updated = await vendorsApi.update(vendor.vendorId, {
        categoryId: vendor.categoryId,
        businessName: vendor.businessName,
        districtLocation: vendor.districtLocation,
        contactPhone: vendor.contactPhone,
        contactEmail: vendor.contactEmail,
        startingPrice: vendor.startingPrice,
        description: vendor.description,
        imageUrl: vendor.imageUrl,
        subscriptionTier: selectedUpgrade,
      })
      setVendor(updated)
      showToast(`Subscription upgraded to ${selectedUpgrade}! Sandbox payment confirmed.`, 'success')
      setUpgradeModal(false)
    } catch (err) {
      showToast(err.message || 'Upgrade failed', 'error')
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="container-app py-10 space-y-6">
        <SkeletonCard />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="container-app py-16 text-center">
        <div className="card max-w-md mx-auto p-8 border-blush-200">
          <FaStore className="mx-auto text-maroon-600 mb-4" size={48} />
          <h2 className="text-xl font-display font-semibold text-charcoal mb-2">No Vendor Business Found</h2>
          <p className="text-sm text-charcoal/60 mb-6">
            You are logged in, but there is no registered wedding business linked to this account yet.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/vendors/new" className="btn-primary">
              Register Your Business
            </Link>
            <Link to="/dashboard" className="btn-outline">
              Go to Couple Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isApproved = vendor.status === 'APPROVED'
  const isPending = vendor.status === 'PENDING'
  const isRejected = vendor.status === 'REJECTED'
  const tier = vendor.subscriptionTier || 'FREE'

  return (
    <div className="min-h-screen bg-ivory-50 pb-16">
      {/* Header Banner */}
      <div className="bg-white border-b border-charcoal/10 shadow-xs">
        <div className="container-app py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl overflow-hidden bg-blush-100 flex items-center justify-center border border-blush-200 shrink-0">
                {vendor.imageUrl ? (
                  <img src={vendor.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <FaStore className="text-maroon-700" size={28} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-display font-bold text-charcoal">{vendor.businessName}</h1>
                  {isApproved && (
                    <Badge variant="success">
                      <FaCheckCircle size={11} className="mr-1 inline" /> Live in Directory
                    </Badge>
                  )}
                  {isPending && (
                    <Badge variant="warning">
                      <FaClock size={11} className="mr-1 inline" /> Awaiting Admin Approval
                    </Badge>
                  )}
                  {isRejected && (
                    <Badge variant="error">
                      <FaTimesCircle size={11} className="mr-1 inline" /> Rejected
                    </Badge>
                  )}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    tier === 'FEATURED' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                    tier === 'PRO' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                    'bg-charcoal/5 text-charcoal/70 border-charcoal/10'
                  }`}>
                    {tier === 'FEATURED' && <FaCrown size={10} className="mr-1 inline text-amber-600" />}
                    {tier} Plan
                  </span>
                </div>
                <p className="text-sm text-charcoal/50 mt-1">
                  {vendor.categoryName} • {vendor.districtLocation} • Starting from Rs. {Number(vendor.startingPrice || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isApproved && (
                <Link to={`/vendors/${vendor.vendorId}`} className="btn-outline text-xs py-2 px-3">
                  <FaExternalLinkAlt size={11} /> View Public Listing
                </Link>
              )}
              <button
                onClick={() => setUpgradeModal(true)}
                className="btn-primary text-xs py-2 px-4 shadow-xs"
              >
                <FaCrown size={12} /> {tier === 'FREE' ? 'Upgrade Plan' : 'Manage Tier'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 border-b border-charcoal/8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'leads', label: `Customer Inquiries (${bookings.length})` },
              { id: 'edit', label: 'Edit Business Profile' },
              { id: 'plan', label: 'Subscription & Commercials' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-maroon-700 text-maroon-700'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container-app py-8 space-y-6">
        {/* Status Callout Banner if Pending */}
        {isPending && (
          <div className="card p-5 bg-amber-50 border-amber-200 text-amber-900 flex items-start gap-3">
            <FaClock className="text-amber-600 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-sm">Your business profile is under review by MagulaPlan Administrators</p>
              <p className="text-xs text-amber-800/80 mt-0.5">
                Once reviewed and approved by an administrator, your business listing and verified credentials will go live in the public wedding directory for couples to discover.
              </p>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={FaStore}
                label="Directory Status"
                value={isApproved ? 'Active' : isPending ? 'Pending' : 'Inactive'}
                color="sage"
              />
              <StatCard
                icon={FaCrown}
                label="Commercial Tier"
                value={tier}
                color="maroon"
              />
              <StatCard
                icon={FaShoppingBag}
                label="Total Leads Received"
                value={bookings.length}
                color="sage"
              />
              <StatCard
                icon={FaShieldAlt}
                label="Verification"
                value={vendor.verified ? 'Verified' : 'Unverified'}
                color="maroon"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card p-6 space-y-4">
                <h2 className="text-lg font-display font-semibold text-charcoal">Business Bio & Service Description</h2>
                <p className="text-sm text-charcoal/70 leading-relaxed whitespace-pre-line">
                  {vendor.description || 'No description provided yet. Go to Edit Business Profile to add details for engaged couples.'}
                </p>

                <div className="pt-4 border-t border-charcoal/5 grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-charcoal/40 uppercase">Direct Phone</span>
                    <p className="text-sm font-medium text-charcoal flex items-center gap-2 mt-0.5">
                      <FaPhone className="text-maroon-600" size={12} /> {vendor.contactPhone}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-charcoal/40 uppercase">Direct Email</span>
                    <p className="text-sm font-medium text-charcoal flex items-center gap-2 mt-0.5">
                      <FaEnvelope className="text-maroon-600" size={12} /> {vendor.contactEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6 space-y-4 bg-gradient-to-br from-blush-50 to-ivory-100 border-blush-200/70">
                <h2 className="text-base font-display font-semibold text-charcoal flex items-center gap-2">
                  <FaCrown className="text-maroon-700" size={15} /> Commercial Plan Benefits
                </h2>
                <ul className="text-xs space-y-2.5 text-charcoal/75">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-sage-600" size={12} />
                    Hosted on Sri Lanka's Curated Platform
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className={vendor.verified ? 'text-sage-600' : 'text-charcoal/30'} size={12} />
                    Verified Vendor Security Checkmark
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className={vendor.featured ? 'text-sage-600' : 'text-charcoal/30'} size={12} />
                    Top Category & Landing Page Feature
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-sage-600" size={12} />
                    Direct WhatsApp Couple Inquiries
                  </li>
                </ul>
                <button
                  onClick={() => setUpgradeModal(true)}
                  className="btn-outline w-full text-xs py-2 mt-2 bg-white"
                >
                  Change Plan Tier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INCOMING LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-display font-semibold text-charcoal">Customer Booking Inquiries</h2>
              <p className="text-charcoal/50 text-sm">
                Couples who added your business to their selection cart and requested direct vendor booking.
              </p>
            </div>

            {bookings.length === 0 ? (
              <EmptyState
                icon={FaShoppingBag}
                title="No inquiries yet"
                subtitle="When couples discover your business in the directory and request a booking through their cart, their inquiry and contact details will appear here."
              />
            ) : (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-charcoal/8 bg-charcoal/[0.02]">
                        <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Couple / Customer</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Contact Email</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Phone Number</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-charcoal/60">Requested At</th>
                        <th className="text-center px-5 py-3.5 font-semibold text-charcoal/60">Direct Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.bookingId} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02]">
                          <td className="px-5 py-3.5 font-medium text-charcoal">
                            {b.customerName || `Customer #${b.userId}`}
                          </td>
                          <td className="px-5 py-3.5 text-charcoal/60">
                            {b.customerEmail || 'N/A'}
                          </td>
                          <td className="px-5 py-3.5 text-charcoal/60">
                            {b.customerPhone || 'N/A'}
                          </td>
                          <td className="px-5 py-3.5 text-charcoal/50 text-xs">
                            {b.bookedAt ? new Date(b.bookedAt).toLocaleDateString() : 'Recent'}
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            {b.customerPhone ? (
                              <a
                                href={`https://wa.me/94${b.customerPhone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(`Hello! Thank you for requesting a booking with ${vendor.businessName} on MagulaPlan. We would be delighted to discuss availability and details.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                              >
                                <FaWhatsapp size={12} /> WhatsApp Couple
                              </a>
                            ) : (
                              <span className="text-xs text-charcoal/40">No phone provided</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EDIT PROFILE */}
        {activeTab === 'edit' && (
          <div className="card p-6 sm:p-8 max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-charcoal">Edit Business Information</h2>
              <p className="text-sm text-charcoal/50">Update your pricing, contact information, and service description.</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <FormField label="Business Name" htmlFor="businessName">
                <input
                  id="businessName"
                  value={editForm.businessName}
                  onChange={(e) => setEditForm((f) => ({ ...f, businessName: e.target.value }))}
                  required
                  className="input-field"
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Starting Price (LKR)" htmlFor="startingPrice">
                  <input
                    id="startingPrice"
                    type="number"
                    min="0"
                    value={editForm.startingPrice}
                    onChange={(e) => setEditForm((f) => ({ ...f, startingPrice: e.target.value }))}
                    className="input-field"
                  />
                </FormField>
                <FormField label="District Location" htmlFor="districtLocation">
                  <select
                    id="districtLocation"
                    value={editForm.districtLocation}
                    onChange={(e) => setEditForm((f) => ({ ...f, districtLocation: e.target.value }))}
                    className="input-field"
                  >
                    {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Contact Phone" htmlFor="contactPhone">
                  <input
                    id="contactPhone"
                    value={editForm.contactPhone}
                    onChange={(e) => setEditForm((f) => ({ ...f, contactPhone: e.target.value }))}
                    required
                    className="input-field"
                  />
                </FormField>
                <FormField label="Contact Email" htmlFor="contactEmail">
                  <input
                    id="contactEmail"
                    type="email"
                    value={editForm.contactEmail}
                    onChange={(e) => setEditForm((f) => ({ ...f, contactEmail: e.target.value }))}
                    required
                    className="input-field"
                  />
                </FormField>
              </div>

              <FormField label="Cover Image URL" htmlFor="imageUrl">
                <input
                  id="imageUrl"
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field text-xs"
                />
              </FormField>

              <FormField label="Business Description" htmlFor="description">
                <textarea
                  id="description"
                  rows={4}
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  className="input-field resize-none"
                  placeholder="Describe your wedding packages, photography style, or venue features..."
                />
              </FormField>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/8">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="btn-outline text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-sm shadow-xs"
                >
                  <FaSave size={13} /> {saving ? 'Saving changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: SUBSCRIPTION & COMMERCIALS */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-charcoal">Commercial Hosting Plans</h2>
              <p className="text-sm text-charcoal/50">Choose how your business is hosted and ranked in the wedding directory.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Free Tier */}
              <div className={`card p-6 flex flex-col justify-between border-2 transition-all ${
                tier === 'FREE' ? 'border-maroon-700 ring-2 ring-maroon-700/10' : 'border-charcoal/10'
              }`}>
                <div>
                  <h3 className="font-display font-semibold text-lg text-charcoal">Free Tier</h3>
                  <p className="text-xs text-charcoal/50 mt-1">Standard directory presence</p>
                  <div className="my-4">
                    <span className="text-2xl font-bold text-charcoal">LKR 0</span>
                    <span className="text-xs text-charcoal/40"> / month</span>
                  </div>
                  <ul className="text-xs space-y-2 text-charcoal/70">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Directory search listing</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Standard contact details</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Cart checkout leads</li>
                  </ul>
                </div>
                {tier === 'FREE' ? (
                  <span className="text-center text-xs font-bold py-2 bg-charcoal/5 rounded-md mt-6 text-charcoal/60">Current Active Plan</span>
                ) : (
                  <button
                    onClick={() => { setSelectedUpgrade('FREE'); setUpgradeModal(true) }}
                    className="btn-outline text-xs mt-6 w-full"
                  >
                    Downgrade to Free
                  </button>
                )}
              </div>

              {/* Pro Tier */}
              <div className={`card p-6 flex flex-col justify-between border-2 transition-all relative ${
                tier === 'PRO' ? 'border-maroon-700 ring-2 ring-maroon-700/10' : 'border-indigo-200'
              }`}>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maroon-700 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Popular Choice
                </span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-charcoal">Pro Verified</h3>
                  <p className="text-xs text-charcoal/50 mt-1">For growing wedding professionals</p>
                  <div className="my-4">
                    <span className="text-2xl font-bold text-charcoal">LKR 2,500</span>
                    <span className="text-xs text-charcoal/40"> / month</span>
                  </div>
                  <ul className="text-xs space-y-2 text-charcoal/70">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Everything in Free</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Verified Vendor Checkmark badge</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Priority phone & WhatsApp inquiry</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-sage-600" size={11} /> Lead inquiry customer analytics</li>
                  </ul>
                </div>
                {tier === 'PRO' ? (
                  <span className="text-center text-xs font-bold py-2 bg-maroon-100 text-maroon-800 rounded-md mt-6">Current Active Plan</span>
                ) : (
                  <button
                    onClick={() => { setSelectedUpgrade('PRO'); setUpgradeModal(true) }}
                    className="btn-primary text-xs mt-6 w-full"
                  >
                    Upgrade to Pro
                  </button>
                )}
              </div>

              {/* Featured Tier */}
              <div className={`card p-6 flex flex-col justify-between border-2 transition-all ${
                tier === 'FEATURED' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-amber-200'
              }`}>
                <div>
                  <h3 className="font-display font-semibold text-lg text-charcoal flex items-center gap-1.5">
                    <FaCrown className="text-amber-500" size={14} /> Featured Luxury
                  </h3>
                  <p className="text-xs text-charcoal/50 mt-1">Maximum visibility and high-budget leads</p>
                  <div className="my-4">
                    <span className="text-2xl font-bold text-charcoal">LKR 5,000</span>
                    <span className="text-xs text-charcoal/40"> / month</span>
                  </div>
                  <ul className="text-xs space-y-2 text-charcoal/70">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-600" size={11} /> Top-of-category directory placement</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-600" size={11} /> Landing page featured vendor showcase</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-600" size={11} /> Gold Featured card badge</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-600" size={11} /> Verified badge included</li>
                  </ul>
                </div>
                {tier === 'FEATURED' ? (
                  <span className="text-center text-xs font-bold py-2 bg-amber-100 text-amber-900 rounded-md mt-6">Current Active Plan</span>
                ) : (
                  <button
                    onClick={() => { setSelectedUpgrade('FEATURED'); setUpgradeModal(true) }}
                    className="btn-primary text-xs mt-6 w-full bg-amber-600 hover:bg-amber-700"
                  >
                    Upgrade to Featured
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Sandbox Payment Modal */}
      <Modal
        open={upgradeModal}
        onClose={() => setUpgradeModal(false)}
        title="Simulated Payment Sandbox"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
            <p className="font-bold flex items-center gap-1.5">
              <FaCreditCard size={12} /> Academic Evaluation Sandbox Gateway
            </p>
            <p className="mt-1 opacity-90">
              Safe demo simulation proving the commercial monetization model. No real banking transaction or credit card charge will occur.
            </p>
          </div>

          <div className="card p-4 bg-charcoal/[0.02] border-charcoal/10 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-charcoal">
              <span>Selected Tier:</span>
              <span className="text-maroon-700 font-bold">{selectedUpgrade} Plan</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Billing Cycle:</span>
              <span>Monthly Subscription</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Commercial Listing Fee:</span>
              <span className="font-bold text-charcoal">
                {selectedUpgrade === 'FEATURED' ? 'LKR 5,000' : selectedUpgrade === 'PRO' ? 'LKR 2,500' : 'LKR 0'}
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
                <label className="text-xs font-semibold text-charcoal/70 block mb-1">Expiry</label>
                <input readOnly value="12 / 28" className="input-field text-xs bg-gray-50 font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal/70 block mb-1">CVC</label>
                <input readOnly value="•••" className="input-field text-xs bg-gray-50 font-mono" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
            <button
              type="button"
              onClick={() => setUpgradeModal(false)}
              className="btn-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={paying}
              onClick={handleSimulateUpgrade}
              className="btn-primary text-xs shadow-xs"
            >
              {paying ? 'Verifying Sandbox Payment...' : 'Simulate Payment & Activate Plan'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
