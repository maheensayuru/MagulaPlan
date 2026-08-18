import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import PageTransition from './components/layout/PageTransition'
import ProtectedRoute from './components/auth/ProtectedRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import VendorDirectory from './pages/VendorDirectory'
import VendorDetails from './pages/VendorDetails'
import VendorRegistration from './pages/VendorRegistration'
import GuestList from './pages/GuestList'
import BudgetTracker from './pages/BudgetTracker'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <ToastProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            </Route>

            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/vendors/new" element={<PageTransition><VendorRegistration /></PageTransition>} />

            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<PageTransition><ProtectedRoute><Dashboard /></ProtectedRoute></PageTransition>} />
              <Route path="/vendors" element={<PageTransition><VendorDirectory /></PageTransition>} />
              <Route path="/vendors/:id" element={<PageTransition><VendorDetails /></PageTransition>} />
              <Route path="/guests" element={<PageTransition><ProtectedRoute><GuestList /></ProtectedRoute></PageTransition>} />
              <Route path="/budget" element={<PageTransition><ProtectedRoute><BudgetTracker /></ProtectedRoute></PageTransition>} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
