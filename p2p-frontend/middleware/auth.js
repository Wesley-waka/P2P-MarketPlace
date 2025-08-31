// middleware/auth.ts
// import { useAuthStore } from '~/stores/authStore'
import { useAuthStore } from "../stores/useAuthStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Check authentication status on initial load
  await authStore.checkAuthStatus()

  // Define routes that require authentication
  const authRequiredRoutes = [
    '/dashboard',
    '/profile',
    '/settings'
  ]

  // Define routes that should only be accessible to guests
  const guestOnlyRoutes = [
    '/login',
    '/signup',
    '/reset-password'
  ]

  // Check if the current route requires authentication
  const requiresAuth = authRequiredRoutes.some(route =>
    to.path.startsWith(route)
  )

  // Check if the current route is guest-only
  const isGuestOnly = guestOnlyRoutes.some(route =>
    to.path.startsWith(route)
  )

  // If route requires auth and user is not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login', { replace: true })
  }

  // If route is guest-only and user is already authenticated
  if (isGuestOnly && authStore.isAuthenticated) {
    return navigateTo('/dashboard', { replace: true })
  }

  // Continue to the route
  return
})