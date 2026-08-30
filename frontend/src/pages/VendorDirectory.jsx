import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaStore, FaPlus } from 'react-icons/fa'
import VendorCard from '../components/vendor/VendorCard'
import { SkeletonCard } from '../components/ui/Skeleton'
import Pagination from '../components/ui/Pagination'
import EmptyState from '../components/ui/EmptyState'
import Dropdown from '../components/ui/Dropdown'
import { useToast } from '../context/ToastContext'
import { vendorsApi, categoriesApi } from '../services/api'
import { DISTRICTS } from '../constants/districts'
import { useAsyncData } from '../lib/useAsyncData'

const PAGE_SIZE = 8

export default function VendorDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const { showToast } = useToast()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [district, setDistrict] = useState('')
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { data, loading, error, reload } = useAsyncData(
    async () => {
      const [vendors, categories] = await Promise.all([
        vendorsApi.list(),
        categoriesApi.list(),
      ])
      return { vendors, categories }
    },
    { initialData: { vendors: [], categories: [] }, onError: () => showToast('Failed to load vendors', 'error') },
  )
  const vendors = data.vendors
  const categories = data.categories

  const filtered = useMemo(() => {
    return vendors
      .filter((v) => {
        const matchesCat = !activeCategory || String(v.categoryId) === String(activeCategory)
        const matchesDistrict = !district || v.districtLocation === district
        const matchesQuery =
          !query ||
          (v.businessName || '').toLowerCase().includes(query.toLowerCase()) ||
          (v.categoryName || '').toLowerCase().includes(query.toLowerCase())
        return matchesCat && matchesDistrict && matchesQuery
      })
      .sort((a, b) => {
        if (sort === 'price-low') return (a.startingPrice || 0) - (b.startingPrice || 0)
        if (sort === 'price-high') return (b.startingPrice || 0) - (a.startingPrice || 0)
        if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
        return (a.businessName || '').localeCompare(b.businessName || '')
      })
  }, [vendors, query, activeCategory, district, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setCategory = (id) => {
    const next = new URLSearchParams(searchParams)
    if (id) next.set('category', id)
    else next.delete('category')
    setSearchParams(next)
    setPage(1)
  }

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="container-app py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-charcoal">Find Wedding Vendors</h1>
            <p className="text-charcoal/50 text-sm mt-1">Discover trusted vendors curated for your dream wedding across Sri Lanka.</p>
          </div>
          <Link to="/vendors/new" className="btn-outline text-sm">
            <FaPlus size={12} /> List your business
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/35" size={16} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search vendors by name, service or style..."
            className="input-field pl-11 py-3.5 text-base"
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2">
          <button
            onClick={() => setCategory('')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory ? 'bg-maroon-700 text-white shadow-xs' : 'bg-blush-50 text-charcoal/70 hover:bg-blush-100 hover:text-maroon-800'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.categoryId}
              onClick={() => setCategory(c.categoryId)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                String(activeCategory) === String(c.categoryId)
                  ? 'bg-maroon-700 text-white shadow-xs'
                  : 'bg-blush-50 text-charcoal/70 hover:bg-blush-100 hover:text-maroon-800'
              }`}
            >
              {c.categoryName}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className={`btn-outline text-sm py-2 px-4 ${filtersOpen ? 'border-maroon-600 text-maroon-700 bg-blush-50/50' : ''}`}
          >
            <FaFilter size={12} className="text-sage-600" /> Filter by district
          </button>
          <div className="w-48">
            <Dropdown
              label="Sort"
              value={sort}
              onChange={(v) => { setSort(v); setPage(1) }}
              options={sortOptions}
            />
          </div>
        </div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="card p-5 space-y-4 bg-blush-50/30 border-blush-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-charcoal">Filter by district</h3>
                  <button onClick={() => { setDistrict(''); setFiltersOpen(false) }} className="text-charcoal/40 hover:text-maroon-700 flex items-center gap-1 text-xs">
                    <FaTimes size={11} /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DISTRICTS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDistrict(d === district ? '' : d); setPage(1) }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        district === d ? 'bg-maroon-700 text-white shadow-xs' : 'bg-white border border-charcoal/10 text-charcoal/70 hover:border-blush-300 hover:text-maroon-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="card p-12 text-center">
            <p className="text-charcoal/70 font-medium">{error}</p>
            <button onClick={reload} className="btn-outline text-sm mt-4">Try again</button>
          </div>
        ) : pageItems.length === 0 ? (
          <EmptyState
            icon={FaStore}
            title="No vendors found"
            subtitle="Try adjusting your search or filters."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {pageItems.map((vendor, i) => (
              <VendorCard key={vendor.vendorId} vendor={vendor} index={i} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  )
}
