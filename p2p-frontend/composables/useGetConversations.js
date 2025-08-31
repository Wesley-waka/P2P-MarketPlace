import { ref, onMounted } from 'vue'

const loading = ref(false)
const conversations = ref([]);
import {useConversationStore} from "~/stores/useConversationStore.js";

const useGetConversations = async () => {
  loading.value = true
  const { user, token } = useAuthStore()
  const URLparams = new URLSearchParams({
    id: user._id
  })
  const {setConversations} = useConversationStore()

    await useCustomFetch(`/messages/matched?${URLparams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response,'hey')
      setConversations(response)
    }).catch(()=>{
      console.log('failed')
    }).finally(() => {
      loading.value = false
    })



  return {
    conversations,
    loading
  }
}

onMounted(() => {
  useGetConversations()
})

export default useGetConversations