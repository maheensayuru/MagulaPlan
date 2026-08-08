import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaCheck } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { useToast } from '../context/ToastContext'

const steps = ['Your Details', 'Wedding Info', 'Confirm']

export default function Register() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const next = (e) => {
    e.preventDefault()
    if (step < 2) setStep(step + 1)
    else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        showToast('Account created! Let\'s start planning.', 'success')
        navigate('/dashboard')
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-radial p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg card p-8 sm:p-10"
      >
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-maroon-500 text-white' : 'bg-charcoal/10 text-charcoal/40'
                }`}
              >
                {i < step ? <FaCheck size={10} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`h-0.5 w-8 sm:w-12 ${i < step ? 'bg-emerald-500' : 'bg-charcoal/10'}`} />}
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-display font-bold text-charcoal text-center mb-1">{steps[step]}</h1>
        <p className="text-charcoal/50 text-sm text-center mb-8">
          {step === 0 && 'Let\'s create your MagulaPlan account'}
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
                    <input required placeholder="Sanduni" className="input-field pl-11" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Last name</label>
                  <input required placeholder="Perera" className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Email address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="email" required placeholder="you@example.com" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="password" required placeholder="Create a strong password" className="input-field pl-11" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Partner's name</label>
                <input placeholder="Chamath Fernando" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Wedding date (or estimate)</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={13} />
                  <input type="date" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal/70 mb-1.5 block">Wedding theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Kandyan', 'Low Country', 'Western'].map((theme) => (
                    <label key={theme} className="flex flex-col items-center gap-2 border border-charcoal/10 rounded-xl p-3 cursor-pointer has-[:checked]:border-gold-400 has-[:checked]:bg-gold-50 text-center">
                      <input type="radio" name="theme" value={theme} className="sr-only" defaultChecked={theme === 'Kandyan'} />
                      <span className="text-xs font-medium text-charcoal/70">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
              <div className="bg-ivory-100 rounded-xl p-5 space-y-2 text-sm">
                <p className="flex justify-between"><span className="text-charcoal/50">Name</span><span className="font-medium text-charcoal">Sanduni Perera</span></p>
                <p className="flex justify-between"><span className="text-charcoal/50">Email</span><span className="font-medium text-charcoal">you@example.com</span></p>
                <p className="flex justify-between"><span className="text-charcoal/50">Theme</span><span className="font-medium text-charcoal">Kandyan</span></p>
              </div>
              <label className="flex items-start gap-2 text-sm text-charcoal/60">
                <input type="checkbox" required className="mt-1 rounded border-charcoal/20 text-maroon-500" />
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
          Already have an account? <Link to="/login" className="text-maroon-500 font-semibold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  )
}
