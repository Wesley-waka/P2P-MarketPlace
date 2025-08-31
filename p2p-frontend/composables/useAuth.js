export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // Login method with enhanced error handling
  const login = async (credentials) => {
    try {
      const result = await authStore.login(credentials)

      // Optional: Add toast or notification
      useToast().success('Login successful')

      // Redirect to dashboard or previous route
      await router.push('/dashboard')

      return result
    } catch (error) {
      // Handle login errors
      useToast().error(error.message || 'Login failed')
      throw error
    }
  }

  // Signup method with enhanced error handling
  const signup = async (userData) => {
    try {
      const result = await authStore.signup(userData)

      useToast().success('Account created successfully')

      await router.push('/dashboard')

      return result
    } catch (error) {
      useToast().error(error.message || 'Signup failed')
      throw error
    }
  }

  // Logout method
  const logout = async () => {
    try {
      await authStore.logout()

      useToast().success('Logged out successfully')
    } catch (error) {
      useToast().error('Logout failed')
    }
  }

  // Password reset method
  const resetPassword = async (email) => {
    try {
      const response = await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: { email }
      })

      useToast().success('Password reset instructions sent')
      return response
    } catch (error) {
      useToast().error(error.message || 'Password reset failed')
      throw error
    }
  }

  return {
    // Computed properties
    user: computed(() => authStore.currentUser),
    isAuthenticated: computed(() => authStore.isLoggedIn),
    loading: computed(() => authStore.loading),
    error: computed(() => authStore.error),
    token: computed(() => authStore.token),
    // Methods
    login,
    signup,
    logout,
    resetPassword,
    checkAuthStatus: () => authStore.checkAuthStatus()
  }
}