<template>
  <form class="px-4 my-3" @submit.prevent="handleSubmit">
    <InputGroup>
      <InputText
          v-model="message"
          class="w-full p-4 border-b border-gray-200"
          placeholder="Type a message"
      />
      <InputGroupAddon>
        <div v-if="loading" class="loading loading-spinner"></div>
        <Button
            v-else
            type="submit"
            icon="pi pi-send"
            severity="secondary"
        />
      </InputGroupAddon>
    </InputGroup>
  </form>
</template>

<script setup>
import { ref } from 'vue';
// import { InputGroup, InputGroupAddon, InputText, Button } from 'primevue/components';

const message = ref('')
const { loading, sendMessage } = useSendMessage()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handleGetMessages'])

const handleSubmit = async () => {
  if (!message.value.trim()) return;
  await sendMessage(message.value, props.id); // Corrected to use props.id
  emit('handleGetMessages', props.id); // Corrected to use props.id
  message.value = '';
};
</script>

<style scoped>
.loading-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>