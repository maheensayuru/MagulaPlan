import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/cart/CartDrawer'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLayout from './components/layout/AdminLayout'
import PageTransition from './components/layout/PageTransition'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import VendorDirectory from './pages/VendorDirectory'
import VendorDetails from './pages/VendorDetails'
import VendorRegistration from './pages/VendorRegistration'
import GuestList from './pages/GuestList'
import BudgetTracker from './pages/BudgetTracker'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import VendorApprovals from './pages/admin/VendorApprovals'
import UserManagement from './pages/admin/UserManagement'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
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
              <Route path="/profile" element={<PageTransition><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
              <Route path="/settings" element={<PageTransition><ProtectedRoute><Settings /></ProtectedRoute></PageTransition>} />
              <Route path="/notifications" element={<PageTransition><ProtectedRoute><Notifications /></ProtectedRoute></PageTransition>} />
            </Route>

            <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
              <Route path="/admin/vendors" element={<PageTransition><VendorApprovals /></PageTransition>} />
              <Route path="/admin/users" element={<PageTransition><UserManagement /></PageTransition>} />
            </Route>

            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <CartDrawer />
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
