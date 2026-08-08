import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './context/ToastContext'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import PageTransition from './components/layout/PageTransition'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import VendorDirectory from './pages/VendorDirectory'
import VendorDetails from './pages/VendorDetails'

function App() {
  const location = useLocation()

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          </Route>

          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/vendors" element={<PageTransition><VendorDirectory /></PageTransition>} />
            <Route path="/vendors/:id" element={<PageTransition><VendorDetails /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ToastProvider>
  )
}

export default App
