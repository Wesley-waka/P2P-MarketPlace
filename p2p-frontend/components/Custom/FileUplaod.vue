<template>
    <div>
        <label for="images">Profile Picture:</label>
        <div class="card flex flex-col items-center gap-6">
          <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-full w-40" />
          <div v-else class="outlined">
            <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-32.png" class="w-40" alt="">
          </div>
          <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined">
            <template #uploadicon>
              <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-29.png" alt="">
            </template>
            <template #content>
              <span class="p-button-label">Upload</span>
            </template>
          </FileUpload>
        </div>
      </div>
</template>

<script setup>
const props = defineProps ({
    onFileSelect: Function,
});
</script>