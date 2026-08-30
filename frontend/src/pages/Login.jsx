import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { riseIn } from '../lib/motion'
import loginEditorial from '../assets/login-editorial.jpg'

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password, remember)
      showToast('Welcome back!', 'success')
      navigate('/dashboard')
    } catch (err) {
      showToast(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ivory-100">
      <div className="hidden lg:block relative overflow-hidden">
        <img src={loginEditorial} alt="Intimate romantic wedding celebration portrait" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div initial="hidden" animate="show" variants={riseIn}>
            <h2 className="text-3xl font-display font-medium text-ivory-50 mb-3">Welcome back to MagulaPlan</h2>
            <p className="text-ivory-100/70 max-w-sm">Pick up right where you left off planning your dream wedding.</p>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div initial="hidden" animate="show" variants={riseIn} className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-2xl font-display font-semibold text-charcoal mb-1">Welcome back</h1>
          <p className="text-charcoal/50 text-sm mb-8">Sign in to continue planning your wedding</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Email address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={14} />
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-charcoal/70 mb-1.5 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={14} />
                <input id="password" type={showPw ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-field pl-11 pr-11" />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30" aria-label="Toggle password visibility">
                  {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-charcoal/70">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-charcoal/25 accent-maroon-700"
              />
              Remember me
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-charcoal/60 mt-8">
            Don't have an account? <Link to="/register" className="text-sm font-semibold text-maroon-700 hover:text-maroon-800">Sign up free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
