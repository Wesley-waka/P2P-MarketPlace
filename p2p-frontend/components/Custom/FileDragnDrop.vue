<script setup>
const { $toast } = useNuxtApp();
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    // accept all files by default
    default: "*/*",
  },
  fileError: {
    type: String,
    default: "Invalid file type. Please upload the right file",
  },
  height: {
    type: String,
    default: "100px",
  },
  width: {
    type: String,
    default: "100%",
  },
  uploadIcon: {
    type: String,
    default: "fas fa-upload",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const fileInput = ref();
const fileModel = defineModel();

const files = computed(() => {
  if (props.multiple) {
    return fileModel.value;
  }

  const rList = [];

  if (fileModel.value) {
    rList.push(fileModel.value);
  }

  return rList;
});

const grabFile = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];

  if (file.type != accept) {
    $toast.error(fileError);
    console.log("Invalid file type");
    return;
  } else {
    // fileModel.value = file;
    handleFileChange(file);
  }
};

const handleFileChange = (files) => {
  if (props.multiple) {
    // add each file to the fileModel
    for (let i = 0; i < files.length; i++) {
      fileModel.value.push(files[i]);
    }
  } else {
    fileModel.value = files[0];
  }
};

const clearFile = () => {
  if (props.multiple) {
    fileModel.value = [];
  } else {
    fileModel.value = null;
  }
};
</script>

<template>
  <div class="space-y-1">
    <label :for="label" class="flex gap-x-1">
      {{ label }}
      <i class="fas fa-asterisk text-red-500 text-[8px] mt-1" v-if="required" />
    </label>
    <div
      @dragenter.prevent
      @dragover.prevent
      @drop.prevent="grabFile"
      class="border border-dashed rounded-md border-[#C5CAD5] bg-[#F4F5F6] p-2 cursor-pointer hover:border-[#0099FF] hover:bg-[#E7F5FF] transition-all duration-200 ease-in relative"
      :style="`height: ${height}; width: ${width}`"
      v-if="!props.multiple"
    >
      <input
        :accept="accept"
        type="file"
        class="hidden"
        ref="fileInput"
        @change="fileModel = $event.target.files[0]"
      />
      <div
        v-if="!fileModel"
        class="flex flex-col items-center justify-center h-full w-full space-y-2.5"
        @click="fileInput.click()"
      >
        <i class="text-gray-500 text-xl" :class="uploadIcon" />
        <p class="text-center text-[#0A2C4F] font-semibold text-sm">
          Drag and Drop <br />or Browse File
        </p>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center h-full w-full"
      >
        <p class="text-lg font-semibold text-green-600 text-wrap">
          {{ fileModel?.name }}
        </p>
        <i
          @click="fileModel = null"
          class="pi pi-times text-red-500 absolute top-2 right-2 cursor-pointer"
        />
      </div>
    </div>

    <div v-else @dragenter.prevent @dragover.prevent @drop.prevent="grabFile">
      <div
        class="border border-dashed rounded-md border-[#C5CAD5] hover:border-[#0099FF] transition-all duration-200 ease-in relative"
        :style="`width: ${width}`"
      >
        <input
          :accept="accept"
          type="file"
          class="hidden"
          ref="fileInput"
          multiple
          @change="(e) => handleFileChange(e.target.files)"
        />
        <div
          v-if="fileModel.length === 0 || !fileModel"
          class="flex flex-col items-center justify-center h-full w-full space-y-2.5 p-2 bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer"
          :style="`min-height: ${height};`"
          @click="fileInput.click()"
        >
          <i class="text-gray-500 text-xl" :class="uploadIcon" />
          <p class="text-center text-[#0A2C4F] font-semibold text-sm">
            Drag and Drop <br />or Browse File
          </p>
        </div>
        <div v-else class="items-start h-full">
          <div class="py-1 px-2 flex gap-x-2 bg-white rounded-t-md">
            <!-- add other file -->
            <button
              type="button"
              class="btn-primary btn-sm uppercase"
              @click="fileInput.click()"
            >
              <i class="fas fa-plus" />
              Add
            </button>
            <!-- clear all -->
            <button
              type="button"
              class="btn-danger outlined btn-sm uppercase"
              @click="clearFile"
            >
              <i class="fas fa-x" />
              Clear
            </button>
          </div>
          <p class="flex flex-wrap gap-1 p-2 bg-gray-100 rounded-b-md">
            <template v-for="(file, index) in files" :key="index">
              <span
                class="bg-gray-300 text-black text-sm px-2 py-1 space-x-2 rounded-full"
              >
                {{ file.name }}
                <i
                  @click="fileModel.splice(index, 1)"
                  class="pi pi-times text-xs text-red-500 cursor-pointer"
                />
              </span>
              <br />
            </template>
          </p>
          <!-- <i
            @click="fileModel = []"
            class="pi pi-times text-red-500 absolute top-2 right-2 cursor-pointer"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>
