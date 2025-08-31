<template>
  <!-- <div>
      <div
        :class="[
          'flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer',
          isSelected ? 'bg-sky-500' : '',
        ]"
        @click="setSelectedConversation(conversation)"
      >
        <div :class="['avatar', isOnline ? 'online' : '']">
          <div class="w-12 rounded-full">
            <img :src="conversation.profilePic" alt="user avatar" />
          </div>
        </div>
  
        <div class="flex flex-col flex-1">
          <div class="flex gap-3 justify-between">
            <p class="font-bold text-gray-200">{{ conversation.fullName }}</p>
            
          </div>
        </div>
      </div>
  
      <div v-if="!lastIdx" class="divider my-0 py-0 h-1" />
    </div> -->


  <div class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
    @click="setSelectedConversation(conversation)">
    <!-- Avatar section with improved styling -->
    <div class="relative">
      <img :src="conversation.profilePic" class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
        alt="User Avatar">
      <div v-if="isOnline" class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
      </div>
    </div>

    <!-- User info section with better spacing and typography -->
    <div class="flex flex-col ml-4 flex-grow">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
            {{ conversation.fullName }}
          </h2>
          <div class="flex items-center mt-0.5 space-x-10">
            <span class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              {{ conversation.userType }}
            </span>
            <span class="text-xs text-gray-500 ml-3">
              2 weeks ago
            </span>
          </div>
        </div>

        <!-- Message icon with hover effect -->
        <!-- <button class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                                    <img src="/public/Black/HT_ICONS_BLACK_RGB-71.png"
                                        class="w-6 h-6 opacity-75 hover:opacity-100 transition-opacity duration-200"
                                        alt="Message Icon">
                                </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import { useConversationStore } from '~/stores/useConversationStore';

const props = defineProps({
  conversation: Object,
  lastIdx: Boolean,
});

const conversationStore = useConversationStore();;
const { selectedConversation, setSelectedConversation } = conversationStore;
const { onlineUsers } = useSocket();

const isSelected = computed(() => selectedConversation?._id === props.conversation._id);
const isOnline = computed(() => onlineUsers.includes(props.conversation._id));
</script>