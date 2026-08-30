import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaPhone, FaWallet, FaCheck } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { riseIn } from '../lib/motion'

const steps = ['Your Details', 'Wedding Info', 'Confirm']

export default function Register() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [totalBudget, setTotalBudget] = useState('')
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { register } = useAuth()

  const fullName = `${firstName} ${lastName}`.trim()

  const next = async (e) => {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
      return
    }
    setLoading(true)
    try {
      await register({
        fullName,
        email,
        password,
        partnerName,
        weddingDate,
        phoneNumber,
        totalBudget: totalBudget ? Number(totalBudget) : undefined,
      })
      showToast('Account created successfully!', 'success')
      navigate('/dashboard')
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-100 p-4 sm:p-8">
      <motion.div initial="hidden" animate="show" variants={riseIn} className="w-full max-w-lg bg-white rounded-xl border border-charcoal/5 shadow-sm p-8 sm:p-10">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    i < step
                      ? 'bg-sage-600 text-white'
                      : i === step
                      ? 'bg-maroon-700 text-white shadow-xs'
                      : 'bg-blush-50 text-charcoal/40 border border-blush-200'
                  }`}
                >
                  {i < step ? <FaCheck size={10} /> : i + 1}
                </div>
                <span className={`text-[11px] mt-1 hidden sm:block ${i === step ? 'font-semibold text-charcoal' : 'text-charcoal/40'}`}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-px flex-1 mx-2 ${i < step ? 'bg-sage-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={next} className="space-y-4">
          {step === 0 && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium text-charcoal/70 mb-1.5 block">First name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                    <input id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Kasun" className="input-field pl-11" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Last name</label>
                  <input id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Perera" className="input-field" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Email address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kasun@example.com" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="input-field pl-11" />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label htmlFor="partnerName" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Partner's name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input id="partnerName" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="Nimmi Fernando" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label htmlFor="weddingDate" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Wedding date (optional)</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input id="weddingDate" type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Phone number (optional)</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="0771234567" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label htmlFor="totalBudget" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Estimated budget in LKR (optional)</label>
                <div className="relative">
                  <FaWallet className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input id="totalBudget" type="number" min="0" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} placeholder="3500000" className="input-field pl-11" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3 bg-blush-50/40 p-4 rounded-xl border border-blush-200/70 text-sm">
              <div className="flex justify-between py-1 border-b border-blush-100"><span className="text-charcoal/60">Name:</span> <span className="font-semibold text-charcoal">{fullName}</span></div>
              <div className="flex justify-between py-1 border-b border-blush-100"><span className="text-charcoal/60">Email:</span> <span className="font-semibold text-charcoal">{email}</span></div>
              {partnerName && <div className="flex justify-between py-1 border-b border-blush-100"><span className="text-charcoal/60">Partner:</span> <span className="font-semibold text-charcoal">{partnerName}</span></div>}
              {weddingDate && <div className="flex justify-between py-1 border-b border-blush-100"><span className="text-charcoal/60">Date:</span> <span className="font-semibold text-charcoal">{weddingDate}</span></div>}
              {totalBudget && <div className="flex justify-between py-1"><span className="text-charcoal/60">Budget:</span> <span className="font-semibold text-maroon-800">Rs. {Number(totalBudget).toLocaleString()}</span></div>}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-outline flex-1">
                Back
              </button>
            )}
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {step === 2 ? (loading ? 'Creating...' : 'Create Account') : 'Continue'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-charcoal/60 mt-6">
          Already have an account? <Link to="/login" className="text-sm font-semibold text-maroon-700 hover:text-maroon-800">Log in</Link>
        </p>
      </motion.div>
    </div>
  )
}
