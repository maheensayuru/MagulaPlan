import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaStore } from 'react-icons/fa'
import { vendors, categories, districts } from '../data/mockData'
import VendorCard from '../components/vendor/VendorCard'
import { SkeletonCard } from '../components/ui/Skeleton'
import Pagination from '../components/ui/Pagination'
import EmptyState from '../components/ui/EmptyState'
import Dropdown from '../components/ui/Dropdown'

const PAGE_SIZE = 8

export default function VendorDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState('')
  const [sort, setSort] = useState('rating')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [loading] = useState(false)

  const filtered = useMemo(() => {
    let list = vendors.filter((v) => {
      const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !activeCategory || v.category === activeCategory
      const matchesDistrict = !district || v.district === district
      return matchesQuery && matchesCategory && matchesDistrict
    })
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'price-low') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom)
    if (sort === 'price-high') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom)
    return list
  }, [query, activeCategory, district, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setCategory = (id) => {
    setPage(1)
    if (id) setSearchParams({ category: id })
    else setSearchParams({})
  }

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-charcoal mb-3">Category</h4>
        <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
          <button
            onClick={() => setCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
              !activeCategory ? 'bg-maroon-50 text-maroon-600 font-semibold' : 'text-charcoal/60 hover:bg-charcoal/5'
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                activeCategory === c.id ? 'bg-maroon-50 text-maroon-600 font-semibold' : 'text-charcoal/60 hover:bg-charcoal/5'
              }`}
            >
              <span className="flex items-center gap-2"><c.icon size={12} /> {c.name}</span>
              <span className="text-xs text-charcoal/30">{c.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-charcoal mb-3">District</h4>
        <Dropdown
          label="All Districts"
          value={district}
          onChange={(v) => { setDistrict(v); setPage(1) }}
          options={[{ value: '', label: 'All Districts' }, ...districts.map((d) => ({ value: d, label: d }))]}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-charcoal mb-3">Wedding Theme</h4>
        <div className="flex flex-wrap gap-2">
          {['Kandyan', 'Low Country', 'Western', 'Traditional', 'Modern'].map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full text-xs bg-charcoal/5 text-charcoal/60 cursor-pointer hover:bg-gold-100 hover:text-gold-700">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-maroon-gradient py-10 sm:py-14">
        <div className="container-app">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ivory-50 mb-2">Find Your Perfect Wedding Vendors</h1>
          <p className="text-ivory-100/70 text-sm mb-6">{vendors.length}+ trusted vendors across Sri Lanka</p>
          <div className="relative max-w-2xl">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/30" size={15} />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search photographers, venues, caterers..."
              className="input-field pl-12 py-3.5 rounded-full shadow-soft"
            />
          </div>
        </div>
      </div>

      <div className="container-app py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="card p-5 sticky top-24">{FilterPanel}</div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6 gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden btn-outline text-sm py-2 px-4"
            >
              <FaFilter size={12} /> Filters
            </button>
            <p className="text-sm text-charcoal/50 hidden sm:block">{filtered.length} vendors found</p>
            <div className="w-48 ml-auto">
              <Dropdown
                label="Sort by"
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'rating', label: 'Top Rated' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                ]}
              />
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : pageItems.length === 0 ? (
            <EmptyState
              icon={FaStore}
              title="No vendors found"
              subtitle="Try adjusting your filters or search term to find more vendors."
            />
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {pageItems.map((v, i) => <VendorCard key={v.id} vendor={v} index={i} />)}
              </AnimatePresence>
            </motion.div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/50 z-50 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden p-5 overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><FaTimes /></button>
              </div>
              {FilterPanel}
              <button onClick={() => setFiltersOpen(false)} className="btn-primary w-full mt-6">Apply Filters</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
