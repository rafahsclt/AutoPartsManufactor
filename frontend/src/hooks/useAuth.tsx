import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from '../services/api'

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  email: string
  name: string
  isAdmin: boolean
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  isAuthenticated: boolean
  user: User
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const isAuthenticated = !!user.email

  async function signOut() {
    if(process.browser) {
      destroyCookie(undefined, 'sup-brakes.token')
      Router.push('/')
    }
  }

  useEffect(() => {
    const { 'sup-brakes.token': token } = parseCookies()

    if(token) {
      api.get('/me')
        .then(response => {
          const { user: responseUser } = response.data

          setUser(responseUser as User)
        })
        .catch(() => signOut())
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { token, user } = response.data

    setCookie(undefined, 'sup-brakes.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    setUser(user as User)

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error("useAuth must be used within a Provider")
  }

  return context
}