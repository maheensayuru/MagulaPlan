import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave } from 'react-icons/fa'
import Tabs from '../components/ui/Tabs'
import FormField from '../components/ui/FormField'
import { riseIn } from '../lib/motion'
import { useToast } from '../context/ToastContext'
import { usersApi } from '../services/api'
import Loading from './Loading'

const TABS = [
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'theme', label: 'Wedding Theme' },
]

const emptyAccount = { name: '', email: '', weddingDate: '', phone: '' }
const emptyPassword = { current: '', next: '', confirm: '' }

export default function Settings() {
  const [tab, setTab] = useState('account')
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(emptyAccount)
  const [password, setPassword] = useState(emptyPassword)
  const [notifyPrefs, setNotifyPrefs] = useState({ email: true, sms: false, whatsapp: true })
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    let cancelled = false
    usersApi
      .me()
      .then((data) => {
        if (cancelled || !data) return
        setAccount({
          name: data.name || '',
          email: data.email || '',
          weddingDate: data.weddingDate || '',
          phone: data.phone || '',
        })
        if (data.notificationPreferences) setNotifyPrefs(data.notificationPreferences)
      })
      .catch(() => {
        // no profile endpoint yet: forms simply start blank
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const saveAccount = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await usersApi.update(account)
      showToast('Account details saved', 'success')
    } catch (err) {
      showToast(err.message || 'Could not save yet: account service is not connected', 'error')
    } finally {
      setSaving(false)
    }
  }

  const saveNotifications = async () => {
    setSaving(true)
    try {
      await usersApi.update({ notificationPreferences: notifyPrefs })
      showToast('Notification preferences saved', 'success')
    } catch (err) {
      showToast(err.message || 'Could not save yet: account service is not connected', 'error')
    } finally {
      setSaving(false)
    }
  }

  const savePassword = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await usersApi.update({ currentPassword: password.current, newPassword: password.next })
      showToast('Password updated', 'success')
      setPassword(emptyPassword)
    } catch (err) {
      showToast(err.message || 'Could not update password yet', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium text-charcoal">Settings</h1>
        <p className="text-charcoal/50 text-sm mt-1">Manage your account and preferences.</p>
      </div>

      <Tabs tabs={TABS} defaultTab="account" onChange={setTab} />

      <motion.div key={tab} initial="hidden" animate="show" variants={riseIn} className="card p-6 sm:p-8">
        {tab === 'account' && (
          <form onSubmit={saveAccount} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Full name" htmlFor="name">
                <input id="name" value={account.name} onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))} placeholder="Your name" className="input-field" />
              </FormField>
              <FormField label="Email" htmlFor="email">
                <input id="email" type="email" value={account.email} onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))} placeholder="you@example.com" className="input-field" />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Phone" htmlFor="phone">
                <input id="phone" value={account.phone} onChange={(e) => setAccount((a) => ({ ...a, phone: e.target.value }))} placeholder="0771234567" className="input-field" />
              </FormField>
              <FormField label="Wedding date" htmlFor="weddingDate">
                <input id="weddingDate" type="date" value={account.weddingDate} onChange={(e) => setAccount((a) => ({ ...a, weddingDate: e.target.value }))} className="input-field" />
              </FormField>
            </div>
            <button type="submit" disabled={saving} className="btn-primary">
              <FaSave size={13} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}

        {tab === 'notifications' && (
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email notifications' },
              { key: 'sms', label: 'SMS notifications' },
              { key: 'whatsapp', label: 'WhatsApp notifications' },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center justify-between py-2">
                <span className="text-sm text-charcoal/80">{opt.label}</span>
                <input
                  type="checkbox"
                  checked={!!notifyPrefs[opt.key]}
                  onChange={(e) => setNotifyPrefs((p) => ({ ...p, [opt.key]: e.target.checked }))}
                  className="h-5 w-5 rounded accent-gold-700"
                />
              </label>
            ))}
            <button onClick={saveNotifications} disabled={saving} className="btn-primary">
              <FaSave size={13} /> {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        )}

        {tab === 'security' && (
          <form onSubmit={savePassword} className="space-y-4">
            <FormField label="Current password" htmlFor="current">
              <input id="current" type="password" value={password.current} onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))} className="input-field" />
            </FormField>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="New password" htmlFor="next">
                <input id="next" type="password" value={password.next} onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))} className="input-field" />
              </FormField>
              <FormField label="Confirm new password" htmlFor="confirm">
                <input id="confirm" type="password" value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} className="input-field" />
              </FormField>
            </div>
            <button type="submit" disabled={saving} className="btn-primary">
              <FaSave size={13} /> {saving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}

        {tab === 'theme' && (
          <div>
            <p className="text-charcoal/60 text-sm">
              Wedding theme preferences (Kandyan, Low Country, Western, colour palette) will appear here once wedding-theme
              planning is available.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
