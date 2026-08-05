import { Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ivory-radial text-center px-4">
      <span className="section-eyebrow mb-4">Frontend Setup Ready</span>
      <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-3">
        Magula<span className="text-gradient-gold">Plan</span>
      </h1>
      <p className="text-charcoal/60 max-w-md">
        MagulaPlan එකට සාදරයෙන් පිළිගනිමු! Routing, Tailwind theme, and dependencies are wired up —
        ready for pages.
      </p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
