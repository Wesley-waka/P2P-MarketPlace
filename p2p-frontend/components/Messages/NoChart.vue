<template>
    <div class="flex items-center justify-center w-full h-full">
        <div
            class="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p>Welcome 👋 {{ authUser.fullName ?? '' }} ❄</p>
            <p>Select a chat to start messaging</p>
            <img src="/public/Black/HT_ICONS_BLACK_RGB-66.png" alt='messages empty' class="h-[40px]" />
        </div>
    </div>
</template>

<script setup>
// import { useAuthStore } from '../../stores/useAuthStore.js';
const { authUser } = useAuthStore();
console.log(authUser)
</script>

<style scoped>
/* Add your styles here */
</style>