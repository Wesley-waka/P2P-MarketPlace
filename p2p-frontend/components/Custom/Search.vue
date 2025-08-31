<template>
  <div class="bg-white border border-[#CED6E3] rounded-lg flex items-center gap-x-1 min-w-40"
    :style="`width: ${props.width}`">
    <!-- :class="`w-[${props.width}]`"> -->
    <i class="fas fa-search text-[#8D98A9] text-sm ml-3"></i>
    <input class="bg-transparent w-full outline-none text-[12px] py-2 px-2 text-[#333333]" v-model="value"
      :placeholder="placeholder" />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    default: "Search",
    type: String,
  },
  width: {
    default: "300px",
    type: String,
  },
});

const value = defineModel();
</script>
