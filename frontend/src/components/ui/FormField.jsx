import { Children, cloneElement, isValidElement, useId } from 'react'

export default function FormField({ label, htmlFor, error, required, children }) {
  const errorId = useId()
  const child = Children.only(children)
  const isRequired = required === true || child?.props?.required === true

  // Wire the error message to the field for assistive tech. The child is a
  // single input/select/textarea; cloning it avoids forcing every call site
  // to pass the error id through manually.
  const field = isValidElement(child)
    ? cloneElement(child, {
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })
    : child

  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal/70 mb-1.5 block">
          {label}
          {isRequired && <span className="text-red-500" aria-hidden="true"> *</span>}
        </label>
      )}
      {field}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
