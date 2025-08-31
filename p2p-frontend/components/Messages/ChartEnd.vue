<template>
    <li class="flex ms-auto gap-x-2 sm:gap-x-4">
        <div class="grow text-end space-y-3">
            <div class="inline-flex flex-col justify-end">
                <!-- Card -->
                <div :class="`inline-block ${props.bgColor} rounded-2xl p-4 shadow-sm`">
                    <p class="text-sm text-white">
                        {{ props.message }}
                    </p>
                </div>
                <!-- End Card -->

                <span class="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                    <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M18 6 7 17l-5-5"></path>
                        <path d="m22 10-7.5 7.5L13 16"></path>
                    </svg>
                    Sent
                </span>
            </div>
        </div>

        <!-- <span class="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600"> -->
        <img class="inline-block size-9 rounded-full" :src="props.src" :alt="props.alt">
        <!-- </span> -->
    </li>
</template>

<script setup>
const props = defineProps([
    'src',
    'alt',
    'message',
    'time',
    'bgColor'
])
</script>