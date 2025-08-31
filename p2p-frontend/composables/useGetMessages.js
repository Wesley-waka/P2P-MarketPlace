import { ref, onMounted, watch } from 'vue'
import {useConversationStore}  from '../stores/useConversationStore.js'
// import { useToast } from 'vue-toastification'
import { useCustomFetch } from './useCustomFetch'

const useGetMessages = (id) => {
  const loading = ref(false)
  const { messages, setMessages, selectedConversation } = useConversationStore()
  const toast = useToast();
  const authStore = useAuthStore();

  const getMessages = async () => {
    loading.value = true

    const URLparams = new URLsearchParams({
      id: authStore.user._id
    })

    try {
      const res = await useCustomFetch(`/messages/${id}?${URLparams}`)
      const data = await res.json()
      console.log(data,'thiis is our data')
      if (data.error) throw new Error(data.error)
      setMessages(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      loading.value = false
    }
  }

  // onMounted(() => {
  //   if (selectedConversation.value?._id) getMessages()
  // })
  //
  // watch(() => selectedConversation.value?._id, (newId) => {
  //   if (newId) getMessages()
  // })
  onMounted(async ()=>{
    await getMessages(id)
  })

  return { messages, loading }
}

export default useGetMessages