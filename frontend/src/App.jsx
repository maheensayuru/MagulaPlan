import { lazy, Suspense, useEffect } from 'react'
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
import ErrorBoundary from './components/ui/ErrorBoundary'
import Loading from './pages/Loading'

// Route-level code splitting: each page (and its heavy dependencies such as
// recharts) is only downloaded the first time its route is visited.
const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const VendorDirectory = lazy(() => import('./pages/VendorDirectory'))
const VendorDetails = lazy(() => import('./pages/VendorDetails'))
const VendorRegistration = lazy(() => import('./pages/VendorRegistration'))
const GuestList = lazy(() => import('./pages/GuestList'))
const BudgetTracker = lazy(() => import('./pages/BudgetTracker'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const Notifications = lazy(() => import('./pages/Notifications'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const VendorApprovals = lazy(() => import('./pages/admin/VendorApprovals'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))

function App() {
  const location = useLocation()

  // Reset scroll to the top on route change. Hash-only changes are left alone
  // so in-page anchor links (e.g. the landing page's #features) keep working.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
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
            </Suspense>
            <CartDrawer />
          </ErrorBoundary>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
