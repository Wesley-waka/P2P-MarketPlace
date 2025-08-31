<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Header",
  },
  itemValue: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="space-y-1 flex flex-col border-b py-1 px-2">
    <span class="text-[#8D98A9] text-xs">{{ label }}</span>
    <span class="">{{ itemValue }}</span>
  </div>
</template>
