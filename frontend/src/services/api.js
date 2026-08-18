const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const TOKEN_KEY = 'magulaplan_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (response.status === 401) {
    clearToken()
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    throw new Error('Session expired. Please log in again.')
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const data = await response.json()
      message = data.message || data.error || message
    } catch {
      // non-JSON error body; keep default message
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}

// Auth
export const authApi = {
  register: (payload) => apiFetch('/api/v1/auth/register', { method: 'POST', body: payload }),
  login: (payload) => apiFetch('/api/v1/auth/login', { method: 'POST', body: payload }),
}

// Guests
export const guestsApi = {
  list: () => apiFetch('/api/v1/guests'),
  create: (payload) => apiFetch('/api/v1/guests', { method: 'POST', body: payload }),
  update: (id, payload) => apiFetch(`/api/v1/guests/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => apiFetch(`/api/v1/guests/${id}`, { method: 'DELETE' }),
  share: (id) => apiFetch(`/api/v1/guests/${id}/share`),
}

// Budget items
export const budgetApi = {
  list: () => apiFetch('/api/v1/budget-items'),
  listByUser: (userId) => apiFetch(`/api/v1/budget-items/user/${userId}`),
  create: (payload) => apiFetch('/api/v1/budget-items', { method: 'POST', body: payload }),
  update: (id, payload) => apiFetch(`/api/v1/budget-items/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => apiFetch(`/api/v1/budget-items/${id}`, { method: 'DELETE' }),
}

// Vendors
export const vendorsApi = {
  list: () => apiFetch('/api/v1/vendors'),
  byCategory: (categoryId) => apiFetch(`/api/v1/vendors/category/${categoryId}`),
  byId: (id) => apiFetch(`/api/v1/vendors/${id}`),
  create: (payload) => apiFetch('/api/v1/vendors', { method: 'POST', body: payload }),
}

// Vendor categories
export const categoriesApi = {
  list: () => apiFetch('/api/v1/vendor-categories'),
}
