import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaPhone, FaWallet, FaCheck } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { riseIn } from '../lib/motion'
import { EditorialEyebrow } from '../components/ui/Ornament'

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
        partnerName,
        email,
        password,
        phoneNumber,
        weddingDate: weddingDate || null,
        totalBudget: totalBudget === '' ? null : Number(totalBudget),
      })
      showToast('Account created! Welcome to MagulaPlan.', 'success')
      navigate('/dashboard')
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-radial p-4 sm:p-8">
      <motion.div initial="hidden" animate="show" variants={riseIn} className="w-full max-w-lg card p-8 sm:p-10">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step ? 'bg-gold-600 text-white' : i === step ? 'bg-gold-500 text-charcoal' : 'bg-charcoal/10 text-charcoal/40'
                }`}
              >
                {i < step ? <FaCheck size={10} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`h-0.5 w-8 sm:w-12 ${i < step ? 'bg-gold-600' : 'bg-charcoal/10'}`} />}
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-3">
          <EditorialEyebrow>Create Your Account</EditorialEyebrow>
        </div>
        <h1 className="text-2xl font-display font-medium text-charcoal text-center mb-1">{steps[step]}</h1>
        <p className="text-charcoal/50 text-sm text-center mb-8">
          {step === 0 && "Let's create your MagulaPlan account"}
          {step === 1 && 'Tell us a little about your big day'}
          {step === 2 && 'Review and confirm your details'}
        </p>

        <form onSubmit={next} className="space-y-4">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">First name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                    <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Sanduni" className="input-field pl-11" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Last name</label>
                  <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Perera" className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Email address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" className="input-field pl-11" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Partner's name (optional)</label>
                <input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="Chamath Fernando" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Wedding date (or estimate)</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Phone number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="0771234567" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Total budget (LKR, optional)</label>
                <div className="relative">
                  <FaWallet className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="number" min="0" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} placeholder="2000000" className="input-field pl-11" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
              <div className="bg-ivory-100 rounded-xl p-5 space-y-2 text-sm">
                <p className="flex justify-between"><span className="text-charcoal/50">Name</span><span className="font-medium text-charcoal">{fullName || '—'}</span></p>
                <p className="flex justify-between"><span className="text-charcoal/50">Email</span><span className="font-medium text-charcoal">{email || '—'}</span></p>
                <p className="flex justify-between"><span className="text-charcoal/50">Wedding date</span><span className="font-medium text-charcoal">{weddingDate || 'Not set'}</span></p>
              </div>
              <label className="flex items-start gap-2 text-sm text-charcoal/60">
                <input type="checkbox" required className="mt-1 rounded border-charcoal/20 text-gold-700" />
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </motion.div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-outline flex-1">
                Back
              </button>
            )}
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Creating account...' : step === 2 ? 'Create Account' : 'Continue'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-charcoal/60 mt-8">
          Already have an account? <Link to="/login" className="text-gold-800 font-semibold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  )
}
