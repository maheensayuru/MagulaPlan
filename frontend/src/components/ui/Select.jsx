export default function Select({ label, id, value, onChange, options = [], placeholder, error, required }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-charcoal/70 mb-1.5 block">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
