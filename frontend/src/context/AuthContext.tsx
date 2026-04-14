import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('vex_token'))
  const [isLoading, setIsLoading] = useState(true)

  // Verify token on mount
  useEffect(() => {
    const verify = async () => {
      const stored = localStorage.getItem('vex_token')
      if (!stored) { setIsLoading(false); return }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${stored}` },
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
          setToken(stored)
        } else {
          localStorage.removeItem('vex_token')
          setToken(null)
        }
      } catch {
        localStorage.removeItem('vex_token')
        setToken(null)
      } finally {
        setIsLoading(false)
      }
    }
    verify()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    localStorage.setItem('vex_token', data.token)
    setToken(data.token)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Registration failed')
    localStorage.setItem('vex_token', data.token)
    setToken(data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('vex_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
