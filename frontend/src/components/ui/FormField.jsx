export default function FormField({ label, htmlFor, error, children }) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal/70 mb-1.5 block">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
