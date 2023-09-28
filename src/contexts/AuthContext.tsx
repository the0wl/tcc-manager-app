'use client'

import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginRoute, recoverRoute } from '@/constants/api'
import { parseCookies, setCookie } from 'nookies'

type Data = {
  id: string
  user: string
  name: string
  type: string
  email: string
  access_token: string
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  data: Data | null
  isAuthenticated: boolean
  signIn: (data: SignInData) => Promise<void>
}

type AuthProviderProps = { children: React.ReactNode }

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<Data | null>(null)
  const router = useRouter()

  const isAuthenticated = !!data

  useEffect(() => {
    const { 'tcc.access_token' : token } = parseCookies()

    if (!token) {
      router.replace('/')
    } else if (!isAuthenticated) {
      const myHeaders = new Headers();
      myHeaders.append("access_token", token);
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders
      };

      const fetchData = (async (route: string, options: RequestInit) => {
        const response = await fetch(route, options)

        if (response.status === 200) {
          const data = await response.json()
          setData(data)
        }
      })

      fetchData(recoverRoute, requestOptions)
    }
  })

  async function signIn({ email, password }: SignInData) {
    const myHeaders = new Headers();
    myHeaders.append("client", "jRv536yTjVy9ynA5Vwb!9p3M09z@9mtq");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ email, password })
    };

    const response = await fetch(loginRoute, requestOptions)

    if (response.status === 200) {
      const data = await response.json()

      setCookie(undefined, 'tcc.access_token', data.access_token, {
        maxAge: 60 * 60 * 24, // 1 day
      })

      setData(data)
      router.replace('/main')
    }
  }

  return (
    <AuthContext.Provider value={{ data, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
