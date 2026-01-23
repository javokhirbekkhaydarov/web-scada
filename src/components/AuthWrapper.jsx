'use client'
import { useEffect, useState } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { authEvents } from '@/utils/events'

const publicRoutes = ['/login', '/register', '/forgot-password']

export default function AuthWrapper({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token')

      setIsAuthenticated(!!token)

      if (!token && !publicRoutes.includes(pathname)) {
        localStorage.setItem('lastVisitedPage', pathname)
        router.push('/login')
      }
    }

    checkAuth()

    const unsubscribe = authEvents.subscribe(() => {
      if (pathname !== '/login') {
        localStorage.setItem('lastVisitedPage', pathname)
      }

      router.push('/login')
    })

    return () => {
      unsubscribe()
    }
  }, [router, pathname])

  if (isAuthenticated === null) {
    return null
  }

  if (publicRoutes.includes(pathname) || isAuthenticated) {
    return children
  }

  return null
}
