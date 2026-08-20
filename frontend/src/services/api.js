const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const TOKEN_KEY = 'magulaplan_token'

// "Remember me" controls which storage the token lives in: localStorage
// survives browser restarts, sessionStorage clears when the tab closes.
export const getToken = () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
export const setToken = (token, remember = true) => {
  const store = remember ? localStorage : sessionStorage
  const other = remember ? sessionStorage : localStorage
  store.setItem(TOKEN_KEY, token)
  other.removeItem(TOKEN_KEY)
}
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

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

// Current user's profile. Endpoint may not exist yet on the backend — callers
// should treat a failed call as "no profile data yet" rather than an error.
export const usersApi = {
  me: () => apiFetch('/api/v1/users/me'),
  update: (payload) => apiFetch('/api/v1/users/me', { method: 'PUT', body: payload }),
}

// Notifications. Endpoint may not exist yet on the backend — callers should
// treat a failed call as "no notifications yet" rather than an error.
export const notificationsApi = {
  list: () => apiFetch('/api/v1/notifications'),
  markRead: (id) => apiFetch(`/api/v1/notifications/${id}/read`, { method: 'PUT' }),
  markAllRead: () => apiFetch('/api/v1/notifications/read-all', { method: 'PUT' }),
  remove: (id) => apiFetch(`/api/v1/notifications/${id}`, { method: 'DELETE' }),
}

// Booking cart. The cart itself lives client-side (CartContext, localStorage)
// since there's nothing to fetch yet — this is only for the eventual
// "finalize booking" handoff to the backend once that endpoint exists.
export const cartApi = {
  checkout: (items) => apiFetch('/api/v1/bookings/checkout', { method: 'POST', body: { items } }),
}

// Admin. None of these endpoints exist yet on the backend — every admin page
// treats a failed call as "no data yet" and renders an empty state, never a
// fabricated stat or list.
export const adminApi = {
  stats: () => apiFetch('/api/v1/admin/stats'),
  pendingVendors: () => apiFetch('/api/v1/admin/vendors/pending'),
  approveVendor: (id) => apiFetch(`/api/v1/admin/vendors/${id}/approve`, { method: 'PUT' }),
  rejectVendor: (id) => apiFetch(`/api/v1/admin/vendors/${id}/reject`, { method: 'PUT' }),
  users: () => apiFetch('/api/v1/admin/users'),
  suspendUser: (id) => apiFetch(`/api/v1/admin/users/${id}/suspend`, { method: 'PUT' }),
  reinstateUser: (id) => apiFetch(`/api/v1/admin/users/${id}/reinstate`, { method: 'PUT' }),
}
