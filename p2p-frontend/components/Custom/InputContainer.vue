<template>
  <div class="space-y-1 px-0.5">
    <div class="flex space-x-1">
      <label :for="label" class="flex gap-x-1">
        {{ label }}
        <i class="fas fa-asterisk text-red-500 text-[8px] mt-1" v-if="required" />
      </label>
    </div>
    <slot />
    <p class="input-error" v-if="error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "This is label",
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>
