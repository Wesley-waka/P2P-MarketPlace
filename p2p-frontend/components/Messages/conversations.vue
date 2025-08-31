<template>
  <div class="py-2 flex flex-col overflow-auto">
    <MessagesConversation v-for="(conversation, idx) in conversations" :key="conversation._id"
      :conversation="conversation" :emoji="getRandomEmoji()" :last-idx="idx === conversations.length - 1" />
    <span v-if="loading" class="loading loading-spinner mx-auto"></span>
  </div>
</template>

<script setup>
//   import { useConversationsStore } from '~/stores/conversations';
//   import { getRandomEmoji } from '~/utils/emojis';
//   import Conversation from '~/components/Conversation.vue';

const { loading, conversations } = useGetConversations();

</script>