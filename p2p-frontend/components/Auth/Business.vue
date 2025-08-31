<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required, helpers } from "@vuelidate/validators";

const props = defineProps(["data"]);
const emit = defineEmits(["update", "back"]);
const { $toast } = useNuxtApp();

const formData = ref({
  next_of_kin_first_name: "",
  next_of_kin_last_name: "",
  next_of_kin_phone_number: "",
  next_of_kin_email: "",
  sponsor_number: "",
  sponsor_name: "",
  sponsor_phone_number: "",
  upline_number: "",
  upline_name: "",
  upline_phone_number: "",
});

const rules = computed(() => {
  return {
    next_of_kin_first_name: {
      required: helpers.withMessage("First name is required", required),
    },
    next_of_kin_last_name: {
      required: helpers.withMessage("Last name is required", required),
    },
    next_of_kin_phone_number: {
      required: helpers.withMessage("Phone number is required", required),
    },
    next_of_kin_email: {
      required: helpers.withMessage("Next of kin email is required", required),
      email: helpers.withMessage("Invalid email", email),
    },
    // sponsor_number: { required: helpers.withMessage('Sponsor number is required', required) },
    // sponsor_name: { required: helpers.withMessage('Sponsor name is required', required) },
    // sponsor_phone_number: { required: helpers.withMessage('Sponsor phone number is required', required) },
    // upline_number: { required: helpers.withMessage('Upline number is required', required) },
    // upline_name: { required: helpers.withMessage('Upline name is required', required) },
    // upline_phone_number: { required: helpers.withMessage('Upline phone number is required', required) },
  };
});

const v$ = useVuelidate(rules, formData);

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    $toast.error("Please fill all required fields");
    return;
  }

  emit("update", formData.value);
};

watch(
  () => props.data,
  (data) => {
    if (data) {
      formData.value = data;
    }
  }
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-between border-b pb-1">
      <button
        class="btn-dark text-xs md:text-base"
        type="button"
        @click="emit('back')"
      >
        <i class="fas fa-chevron-left"></i> Back
      </button>

      <button class="btn-primary text-xs md:text-base" type="submit">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div style="height: calc(100vh - 260px)">
      <div class="overflow-auto h-full pb-6 pt-1">
        <h3 class="text-xl font-semibold text-black">Next of Kin</h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-3 border-b pb-4"
        >
          <CustomInputContainer
            label="First Name"
            required
            :error="v$.next_of_kin_first_name.$error"
            :errorMessage="v$.next_of_kin_first_name.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.next_of_kin_first_name"
              @blur="v$.next_of_kin_first_name.$touch"
              :invalid="v$.next_of_kin_first_name.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Last Name"
            required
            :error="v$.next_of_kin_last_name.$error"
            :errorMessage="v$.next_of_kin_last_name.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.next_of_kin_last_name"
              @blur="v$.next_of_kin_last_name.$touch"
              :invalid="v$.next_of_kin_last_name.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Phone Number"
            required
            :error="v$.next_of_kin_phone_number.$error"
            :errorMessage="v$.next_of_kin_phone_number.$errors[0]?.$message"
          >
            <InputText
              type="number"
              v-model="formData.next_of_kin_phone_number"
              @blur="v$.next_of_kin_phone_number.$touch"
              :invalid="v$.next_of_kin_phone_number.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Email"
            required
            :error="v$.next_of_kin_email.$error"
            :errorMessage="v$.next_of_kin_email.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.next_of_kin_email"
              @blur="v$.next_of_kin_email.$touch"
              :invalid="v$.next_of_kin_email.$error"
            />
          </CustomInputContainer>
        </div>

        <h3 class="text-xl font-semibold text-black">Sponsor Information</h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-3 border-b pb-4"
        >
          <CustomInputContainer label="Sponsor Number">
            <InputText v-model="formData.sponsor_number" />
          </CustomInputContainer>

          <CustomInputContainer label="Sponsor Name">
            <InputText v-model="formData.sponsor_name" />
          </CustomInputContainer>

          <CustomInputContainer label="Sponsor Phone Number">
            <InputText v-model="formData.sponsor_phone_number" />
          </CustomInputContainer>
        </div>

        <h3 class="text-xl font-semibold text-black">
          Upline Distribution Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-3">
          <CustomInputContainer label="Upline Number">
            <InputText v-model="formData.upline_number" />
          </CustomInputContainer>

          <CustomInputContainer label="Upline Name">
            <InputText v-model="formData.upline_name" />
          </CustomInputContainer>

          <CustomInputContainer label="Upline Phone Number">
            <InputText v-model="formData.upline_phone_number" />
          </CustomInputContainer>
        </div>
      </div>
    </div>
  </form>
</template>
