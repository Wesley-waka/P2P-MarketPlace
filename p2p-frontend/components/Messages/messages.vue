<template>
	<div class="px-4 flex-1 overflow-auto">
		<div v-if="!loading && messages.length > 0">
			<div v-for="message in messages" :key="message._id" ref="lastMessageRef">
                <MessagesMessage :message="message" />
            </div>
				
			</div>
		</div>
		<div v-if="loading">
			<SkeletonsMessage v-for="idx in 3" :key="idx" />
		</div>
		<p v-if="!loading && messages.length === 0" class="text-center">
			Send a message to start the conversation
		</p>
	
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';



const { messages, loading } = useGetMessages();
useListenMessage();
const lastMessageRef = ref(null);

onMounted(() => {
    setTimeout(() => {
        lastMessageRef.value?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

watch(messages, () => {
    setTimeout(() => {
        lastMessageRef.value?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
});




</script>

<style scoped>
/* Add your styles here */
</style>
