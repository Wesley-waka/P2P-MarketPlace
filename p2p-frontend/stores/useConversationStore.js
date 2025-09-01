import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useConversationStore = defineStore('conversation', () => {
  // State
  const selectedConversation = ref('');
  const messages = ref([]);
  const conversations = ref([]);
  const { user, token } = useAuthStore();
  const loading = ref(false);

  // Actions
  const setSelectedConversation = (conversation) => {
    selectedConversation.value = conversation;
  };

  const getConversations = async () => {
    loading.value = true;
    const URLparams = new URLSearchParams({
      id: user._id
    });

    await useCustomFetch(`/messages/matched?${URLparams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      conversations.value = response;
      console.log(response,'hello from response');
      setConversations(response);
    }).catch(() => {
      console.log('failed');
    }).finally(() => {
      loading.value = false;
    });
  };

  const setConversations = (newConversations) => {
    console.log(newConversations, 'hryt');
    conversations.value = newConversations;
  };

  const setMessages = (newMessages) => {
    messages.value = newMessages;
  };

  onMounted(async () => {
    await getConversations();
  });

  return {
    // State
    selectedConversation,
    messages,
    conversations,
    loading,
    // Actions
    getConversations,
    setSelectedConversation,
    setConversations,
    setMessages,
  };
});