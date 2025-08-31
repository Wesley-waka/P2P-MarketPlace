<script setup>
const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="list-item" :class="{ active: props.active }">
    <img
      :src="props.image"
      alt=""
      class="w-12 h-12 rounded-full"
      v-if="props.image"
    />
    <i class="fas fa-user-circle user-icon" v-else />

    <div class="data-section">
      <h2 class="item-name truncate w-full">
        {{ props.name }}
      </h2>

      <div class="item-details">
        <i class="fas fa-envelope mr-2" v-if="props.email" />
        <span class="truncate">
          {{ props.email || props.desc }}
        </span>
      </div>
    </div>
  </div>
</template>
