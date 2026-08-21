import { createContext, useContext, useState } from 'react'
import { authApi, getToken, setToken, clearToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken())

  const login = async (email, password, remember = true) => {
    const data = await authApi.login({ email, password })
    setToken(data.token, remember)
    setTokenState(data.token)
    return data
  }

  const register = async (payload) => {
    const data = await authApi.register(payload)
    setToken(data.token)
    setTokenState(data.token)
    return data
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
