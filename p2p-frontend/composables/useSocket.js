// composables/useSocket.js
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/useAuthStore'

export const useSocket = () => {
  const nuxtApp = useNuxtApp()
  const socket = ref(null)
  const onlineUsers = ref([])

  const { authUser } = storeToRefs(useAuthStore())

  // Watch for auth changes
  watch(authUser, (newAuthUser) => {
    if (newAuthUser) {
      // Connect socket when user is authenticated
      socket.value = nuxtApp.$socket.connect(newAuthUser._id)

      // Set up socket listeners
      socket.value.on('getOnlineUsers', (users) => {
        onlineUsers.value = users
      })
    } else {
      // Disconnect socket when user logs out
      nuxtApp.$socket.disconnect()
      socket.value = null
      onlineUsers.value = []
    }
  }, { immediate: true })

  // Clean up function
  onBeforeUnmount(() => {
    if (socket.value) {
      nuxtApp.$socket.disconnect()
    }
  })

  return {
    socket: readonly(socket),
    onlineUsers: readonly(onlineUsers)
  }
}