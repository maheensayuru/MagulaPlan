import { useMemo, useState, useEffect } from 'react'
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

const PAGE_SIZE = 8

export default function VendorDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [vendors, setVendors] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [district, setDistrict] = useState('')
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { showToast } = useToast()

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const [vendorData, categoryData] = await Promise.all([vendorsApi.list(), categoriesApi.list()])
      setVendors(vendorData)
      setCategories(categoryData)
    } catch (e) {
      setError(e.message || 'Failed to load vendors')
      showToast('Failed to load vendors', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    let list = vendors.filter((v) => {
      const name = (v.businessName || '').toLowerCase()
      const matchesQuery = !query || name.includes(query.toLowerCase())
      const matchesCategory = !activeCategory || String(v.categoryId) === activeCategory
      const matchesDistrict = !district || v.districtLocation === district
      return matchesQuery && matchesCategory && matchesDistrict
    })
    if (sort === 'name') list = [...list].sort((a, b) => (a.businessName || '').localeCompare(b.businessName || ''))
    if (sort === 'price-low') list = [...list].sort((a, b) => (Number(a.startingPrice) || 0) - (Number(b.startingPrice) || 0))
    if (sort === 'price-high') list = [...list].sort((a, b) => (Number(b.startingPrice) || 0) - (Number(a.startingPrice) || 0))
    return list
  }, [vendors, query, activeCategory, district, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setCategory = (id) => {
    setPage(1)
    if (id) setSearchParams({ category: String(id) })
    else setSearchParams({})
  }

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ]

  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="container-app py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-medium text-charcoal">Vendor Directory</h1>
            <p className="text-charcoal/50 text-sm mt-1">Find trusted wedding vendors across Sri Lanka.</p>
          </div>
          <Link to="/vendors/new" className="btn-gold text-sm">
            <FaPlus size={13} /> List your business
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search vendors by name..."
            className="input-field pl-11 py-3.5"
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2">
          <button
            onClick={() => setCategory('')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCategory ? 'bg-gold-700 text-white' : 'bg-white text-charcoal/60 border border-charcoal/10 hover:bg-charcoal/5'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.categoryId}
              onClick={() => setCategory(c.categoryId)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${String(activeCategory) === String(c.categoryId) ? 'bg-gold-700 text-white' : 'bg-white text-charcoal/60 border border-charcoal/10 hover:bg-charcoal/5'}`}
            >
              {c.categoryName}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="btn-outline text-sm py-2.5"
          >
            <FaFilter size={13} /> Filters
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
              <div className="card p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-charcoal">Filters</h3>
                  <button onClick={() => { setDistrict(''); setFiltersOpen(false) }} className="text-charcoal/40 hover:text-charcoal flex items-center gap-1 text-xs">
                    <FaTimes size={11} /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DISTRICTS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDistrict(d === district ? '' : d); setPage(1) }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${district === d ? 'bg-gold-700 text-white' : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'}`}
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
            <button onClick={load} className="btn-outline text-sm mt-4">Try again</button>
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
