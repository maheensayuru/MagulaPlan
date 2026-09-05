import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaTimes } from 'react-icons/fa'
import Logo from '../components/layout/Logo'
import { LotusMark, SectionDivider, EditorialEyebrow } from '../components/ui/Ornament'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { riseIn } from '../lib/motion'
import loginPortrait from '../assets/login-portrait.jpg'

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
      const data = await login(email.trim(), password, remember)
      showToast('Welcome back!', 'success')
      if (data?.role === 'ADMIN') {
        navigate('/admin')
      } else if (data?.role === 'VENDOR') {
        navigate('/vendor/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      const msg = (err.message && !err.message.includes('401') && !err.message.includes('failed'))
        ? err.message
        : 'Invalid email or password. Please check your credentials and try again.'
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory-100 lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ─── EDITORIAL IMAGE PANEL ─── */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src={loginPortrait}
          alt="A Sri Lankan bride and groom in traditional Kandyan wedding attire"
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        />
        {/* Deep maroon scrims keep the caption legible and hold the storybook mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/25 to-maroon-950/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-950/35 via-transparent to-transparent" />

        {/* Hairline editorial frame */}
        <div className="absolute inset-5 border border-ivory-50/25 rounded-xl2 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div initial="hidden" animate="show" variants={riseIn} className="max-w-md">
            <EditorialEyebrow tone="light" className="mb-5">Storybook Romance</EditorialEyebrow>
            <h2 className="text-4xl font-display font-medium text-ivory-50 leading-[1.15] mb-6">
              Welcome back to the story you&apos;re writing together.
            </h2>
            <SectionDivider className="!justify-start" />
          </motion.div>
        </div>
      </div>

      {/* ─── FORM PANEL ─── */}
      <div className="relative flex items-center justify-center p-6 sm:p-12 overflow-hidden">
        {/* Close / Back to Home in the corner */}
        <Link
          to="/"
          aria-label="Back to home"
          className="absolute top-6 right-6 z-20 h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-charcoal/10 flex items-center justify-center text-charcoal/60 hover:text-maroon-700 shadow-xs transition-all"
        >
          <FaTimes size={15} />
        </Link>

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blush-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-sage-100/40 blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={riseIn}
          className="relative w-full max-w-sm"
        >
          <div className="mb-8">
            <Logo />
          </div>

          <div className="flex items-center gap-3 mb-1">
            <LotusMark className="h-7 w-7 text-maroon-500 shrink-0" />
            <h1 className="text-2xl font-display font-semibold text-charcoal">Welcome back</h1>
          </div>
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
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-maroon-600 transition-colors" aria-label="Toggle password visibility">
                  {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-charcoal/25 accent-maroon-700"
                />
                Remember me
              </label>
              <Link to="/register" className="text-sm font-medium text-charcoal/40 hover:text-maroon-700 transition-colors">
                Need an account?
              </Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Logging in...' : <>Log In <FaArrowRight size={12} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-charcoal/60 mt-8">
            Don&apos;t have an account? <Link to="/register" className="text-sm font-semibold text-maroon-700 hover:text-maroon-800">Sign up free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
