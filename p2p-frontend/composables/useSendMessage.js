// composables/useSendMessage.js
// import { useState } from '#app'
// import { useToast } from 'vue-toastification' // You'll need to install this or similar
// import { useConversationStore } from '~/stores/conversation' // Assuming you're using Pinia for state management
import { useCustomFetch } from './useCustomFetch'
import {useConversationStore}  from '~/stores/useConversationStore'

export const useSendMessage = () => {
  const loading = ref(false)
  const conversationStore = useConversationStore();
  const authStore = useAuthStore();

  const sendMessage = async (message,id) => {
    loading.value = true;

    console.log(authStore);

    const params = new URLSearchParams({
      id: authStore.user._id
    }).toString()

    try {
      const { data, error } = await useCustomFetch(`/messages/send/${id}?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: ({"message": message})
      })

      if (error.value) throw new Error(error.value.message)
      if (data.value.error) throw new Error(data.value.error)

      // Update messages in store
      conversationStore.setMessages([...conversationStore.messages, data.value])
    } catch (error) {
      // $toast.error(error.message)
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  return {
    sendMessage,
    loading: readonly(loading)
  }
}