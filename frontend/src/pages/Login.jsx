import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('Welcome back! Redirecting to your dashboard...', 'success')
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ivory-100">
      <div className="hidden lg:block relative">
        <img src="https://picsum.photos/seed/loginwedding/900/1200" alt="Sri Lankan wedding" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-maroon-gradient opacity-70" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-display font-bold text-ivory-50 mb-3">Welcome back to MagulaPlan</h2>
            <p className="text-ivory-100/70 max-w-sm">Pick up right where you left off planning your dream wedding.</p>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-2xl font-display font-bold text-charcoal mb-1">Log in to your account</h1>
          <p className="text-charcoal/50 text-sm mb-8">Continue planning your perfect day.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Email address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={14} />
                <input id="email" type="email" required placeholder="you@example.com" className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={14} />
                <input id="password" type={showPw ? 'text' : 'password'} required placeholder="••••••••" className="input-field pl-11 pr-11" />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30" aria-label="Toggle password visibility">
                  {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-charcoal/60">
                <input type="checkbox" className="rounded border-charcoal/20 text-maroon-500 focus:ring-gold-300" /> Remember me
              </label>
              <a href="#" className="text-maroon-500 font-medium hover:underline">Forgot password?</a>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-charcoal/10 flex-1" />
            <span className="text-xs text-charcoal/40">OR</span>
            <div className="h-px bg-charcoal/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-outline text-sm py-2.5"><FaGoogle size={14} /> Google</button>
            <button className="btn-outline text-sm py-2.5"><FaFacebook size={14} /> Facebook</button>
          </div>

          <p className="text-center text-sm text-charcoal/60 mt-8">
            Don't have an account? <Link to="/register" className="text-maroon-500 font-semibold hover:underline">Sign up free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
