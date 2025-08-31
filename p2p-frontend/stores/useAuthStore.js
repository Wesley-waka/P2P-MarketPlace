import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCookie } from 'nuxt/app'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  // Getters (as computed)
  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value)

  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await useCustomFetch('/auth/signin', {
        method: 'POST',
        body: credentials
      })

      if (response.token && response.user) {
        setUser(response.user)
        setToken(response.token)

        // Set authentication cookie and local storage
        const authCookie = useCookie('auth_token', {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/'
        })
        authCookie.value = response.token

        // Optional: Persist token in localStorage for additional redundancy
        localStorage.setItem('auth_token', response.token)

        return response
      } else {
        throw new Error('Login failed')
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signup = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const response = await useCustomFetch('/api/auth/signup', {
        method: 'POST',
        body: userData
      })

      if (response.token && response.user) {
        setUser(response.user)
        setToken(response.token)

        // Set authentication cookie and local storage
        const authCookie = useCookie('auth_token', {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/'
        })
        authCookie.value = response.token

        // Optional: Persist token in localStorage for additional redundancy
        localStorage.setItem('auth_token', response.token)

        return response
      }

      throw new Error('Signup failed')
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      // Optional: Call backend logout endpoint
      await useCustomFetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout API call failed', err)
    }

    // Clear authentication state
    clearUser()
  }

  const setUser = (userData) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const setToken = (tokenValue) => {
    token.value = tokenValue
    // Optional: Store token in localStorage
    localStorage.setItem('auth_token', tokenValue)
  }

  const clearUser = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false

    // Clear authentication cookie
    const authCookie = useCookie('auth_token')
    authCookie.value = null

    // Clear localStorage
    localStorage.removeItem('auth_token')

    // Navigate to login page
    navigateTo('/login')
  }

  const checkAuthStatus = async () => {
    // Check both cookie and localStorage for token
    const cookieToken = useCookie('auth_token').value
    const localStorageToken = localStorage.getItem('auth_token')
    const currentToken = cookieToken || localStorageToken

    if (!currentToken) {
      clearUser()
      return false
    }

    try {
      const response = await useCustomFetch('/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })

      if (response) {
        setUser(response)
        isAuthenticated.value = true
        return true
      }
    } catch (err) {
      clearUser()
      return false
    }
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,

    // Getters
    currentUser,
    isLoggedIn,

    // Actions
    login,
    signup,
    logout,
    setUser,
    setToken,
    clearUser,
    checkAuthStatus
  }
}, {
  persist: {
    storage: localStorage,
    paths: ['user', 'token', 'isAuthenticated']
  }
})