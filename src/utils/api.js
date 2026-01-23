'use client'
import axios from 'axios'

import { authEvents } from './events'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    token ? prom.resolve(token) : prom.reject(error)
  })
  failedQueue = []
}

instance.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined' && !config.open) {
      const token = localStorage.getItem('access_token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  error => Promise.reject(error)
)

export const api = ({ url, open = false, ...props }) => {
  return instance({ url, open, ...props })
}

async function refreshTokenAndRetry(originalRequest, error) {
  try {
    const refresh_token = localStorage.getItem('refresh_token')

    if (!refresh_token) {
      clearSession()

      return Promise.reject(error.response?.data?.detail || 'Token not found')
    }

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}token/refresh/`, {
      refresh: refresh_token
    })

    if (data?.access) {
      localStorage.setItem('access_token', data.access)
      document.cookie = `access_token=${data.access}; path=/`

      processQueue(null, data.access)

      originalRequest.headers['Authorization'] = `Bearer ${data.access}`

      return instance(originalRequest)
    } else {
      throw new Error('Failed to refresh token')
    }
  } catch (error) {
    clearSession()
    processQueue(error, null)

    return Promise.reject(error)
  } finally {
    isRefreshing = false
  }
}

function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'

    authEvents.emit()
  }
}

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    const isUrlRefreshToken = originalRequest.url?.includes('/token/refresh/')

    if (error.response?.status === 401 && !originalRequest._retry && !isUrlRefreshToken) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`

            return instance(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      isRefreshing = true

      try {
        return await refreshTokenAndRetry(originalRequest, error)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default instance
