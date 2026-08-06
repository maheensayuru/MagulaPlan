import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="h-10 w-10 flex items-center justify-center rounded-full border border-charcoal/10 text-charcoal/60 disabled:opacity-30 hover:bg-charcoal/5 transition-colors"
      >
        <FaChevronLeft size={14} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onChange(p)}
          className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
            p === page ? 'bg-maroon-500 text-white' : 'text-charcoal/60 hover:bg-charcoal/5'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="h-10 w-10 flex items-center justify-center rounded-full border border-charcoal/10 text-charcoal/60 disabled:opacity-30 hover:bg-charcoal/5 transition-colors"
      >
        <FaChevronRight size={14} />
      </button>
    </nav>
  )
}
