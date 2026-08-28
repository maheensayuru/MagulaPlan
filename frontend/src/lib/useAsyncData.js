import { useCallback, useEffect, useRef, useState } from 'react'

// Fetch data on mount and expose `reload` (post-mutation refresh) and `setData`
// (optimistic updates). The fetcher/onError are read through refs so the fetch
// effect runs exactly once even though callers pass fresh inline functions on
// every render; the refs are synced in an effect, not during render.
export function useAsyncData(fetcher, { initialData = null, onError } = {}) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetcherRef = useRef(fetcher)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    fetcherRef.current = fetcher
    onErrorRef.current = onError
  })

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setData(await fetcherRef.current())
    } catch (e) {
      setError(e?.message || 'Something went wrong')
      onErrorRef.current?.(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    fetcherRef.current()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setError('')
      })
      .catch((e) => {
        if (cancelled) return
        setError(e?.message || 'Something went wrong')
        onErrorRef.current?.(e)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, setData, loading, error, reload }
}
