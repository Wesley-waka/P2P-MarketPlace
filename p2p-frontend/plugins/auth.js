// plugins/auth.ts
// import { useAuthStore } from '../stores/useAuthStore'
// export default defineNuxtPlugin(async (nuxtApp) => {
//   const authStore = useAuthStore()

//   // Check authentication status on app initialization
//   await authStore.checkAuthStatus()

//   // Optional: Set up interceptors for global error handling
//   const customFetch = useCustomFetch()

//   // Global error interceptor
//   customFetch.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       // Handle unauthorized errors
//       if (error.response?.status === 401) {
//         // Logout user and redirect to login
//         authStore.logout()
//         navigateTo('/login')
//       }

//       return Promise.reject(error)
//     }
//   )
// })


// export default defineNuxtPlugin(async (nuxtApp) => {
//   const authStore = useAuthStore()

//   // Check authentication status on app initialization
//   await authStore.checkAuthStatus()

//   // Global error handling
//   nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
//     // Check if the error is an HTTP error
//     if (error.response && error.response.status === 401) {
//       authStore.logout()
//       navigateTo('/')
//     }

//     // Optionally log the error
//     console.error('Global Error Handler:', error, info)
//   }
// })