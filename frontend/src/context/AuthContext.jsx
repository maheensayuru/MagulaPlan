import { createContext, useContext, useState } from 'react'
import { authApi, getToken, setToken, clearToken, getUserId, setUserId, clearUserId } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken())
  const [userId, setUserIdState] = useState(getUserId())

  const login = async (email, password, remember = true) => {
    const data = await authApi.login({ email, password })
    setToken(data.token, remember)
    setUserId(data.userId, remember)
    setTokenState(data.token)
    setUserIdState(data.userId)
    return data
  }

  const register = async (payload) => {
    const data = await authApi.register(payload)
    setToken(data.token)
    setUserId(data.userId)
    setTokenState(data.token)
    setUserIdState(data.userId)
    return data
  }

  const logout = () => {
    clearToken()
    clearUserId()
    setTokenState(null)
    setUserIdState(null)
  }

  return (
    <AuthContext.Provider value={{ token, userId, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
