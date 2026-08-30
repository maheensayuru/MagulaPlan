import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { usersApi } from '../../services/api'
import Loading from '../../pages/Loading'

// Admin access is gated on a real `role` field from the backend, not a
// hardcoded bypass. Until that endpoint/field exists, this denies everyone,
// which is the correct default for an admin panel, not a bug to work around.
//
// DEV-ONLY PREVIEW: set VITE_ADMIN_PREVIEW=true in your local .env to skip
// the check while building the UI. Gated on `import.meta.env.DEV` as well,
// so it's inert in any production build (`vite build`) regardless of env
// vars. This can never accidentally grant access to a deployed site.
const DEV_PREVIEW = import.meta.env.DEV && import.meta.env.VITE_ADMIN_PREVIEW === 'true'

export default function AdminRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const [checking, setChecking] = useState(!DEV_PREVIEW)
  const [isAdmin, setIsAdmin] = useState(DEV_PREVIEW)

  useEffect(() => {
    if (DEV_PREVIEW || !isAuthenticated) return
    let cancelled = false
    usersApi
      .me()
      .then((data) => {
        if (!cancelled) setIsAdmin(data?.role === 'ADMIN' || data?.isAdmin === true)
      })
      .catch(() => {
        // no profile endpoint / role field yet: treat as not-admin, never fake access
      })
      .finally(() => {
        if (!cancelled) setChecking(false)
      })
    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  if (DEV_PREVIEW) return children
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (checking) return <Loading />
  if (!isAdmin) return <Navigate to="/dashboard" replace />
  return children
}
