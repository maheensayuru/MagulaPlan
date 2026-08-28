import { describe, it, expect, vi, afterEach } from 'vitest'
import { apiFetch, setToken, getToken, clearToken, clearUserId } from './api'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
  clearToken()
  clearUserId()
})

describe('apiFetch error handling', () => {
  it('surfaces the backend message for 4xx client errors', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Email already registered' }),
    })
    await expect(apiFetch('/api/v1/auth/register', { method: 'POST', body: {} })).rejects.toThrow(
      'Email already registered',
    )
  })

  it('genericizes 5xx server errors so internals never leak', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'java.sql.SQLException: bad table', stack: '...' }),
    })
    await expect(apiFetch('/api/v1/vendors')).rejects.toThrow(
      'Something went wrong on our end. Please try again.',
    )
  })

  it('returns null for 204 No Content', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, status: 204 })
    await expect(apiFetch('/api/v1/guests/1', { method: 'DELETE' })).resolves.toBeNull()
  })

  it('attaches the Bearer token when one is stored', async () => {
    setToken('test-token')
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
    await apiFetch('/api/v1/guests')
    const [, options] = globalThis.fetch.mock.calls[0]
    expect(options.headers.Authorization).toBe('Bearer test-token')
  })
})

describe('token storage', () => {
  it('persists across restarts with remember=true (localStorage)', () => {
    setToken('abc', true)
    expect(localStorage.getItem('magulaplan_token')).toBe('abc')
    expect(getToken()).toBe('abc')
  })

  it('clears on tab close with remember=false (sessionStorage)', () => {
    setToken('xyz', false)
    expect(sessionStorage.getItem('magulaplan_token')).toBe('xyz')
    expect(localStorage.getItem('magulaplan_token')).toBeNull()
    expect(getToken()).toBe('xyz')
  })
})
