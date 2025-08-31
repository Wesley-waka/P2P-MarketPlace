<script setup>
import useVuelidate from "@vuelidate/core";
import {
  email,
  required,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";


const props = defineProps(["data"]);
const emit = defineEmits(["update"]);
const { $toast } = useNuxtApp();

// max date is 18 years ago
const maxDate = ref(new Date());

const idTypes = ref([
  { label: "National ID", value: "national_id" },
  { label: "Passport", value: "passport" },
]);

const formData = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  date_of_birth: new Date(),
  id_type: "",
  id_number: "",
  ssn: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
});

const rules = computed(() => {
  return {
    first_name: {
      required: helpers.withMessage("First name is required", required),
    },
    last_name: {
      required: helpers.withMessage("Last name is required", required),
    },
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Invalid email", email),
    },
    phone_number: {
      required: helpers.withMessage("Phone number is required", required),
    },
    date_of_birth: {
      required: helpers.withMessage("Date of birth is required", required),
    },
    id_type: { required: helpers.withMessage("ID type is required", required) },
    id_number: {
      required: helpers.withMessage("ID number is required", required),
    },
    ssn: {
      required: helpers.withMessage("SSN is required", required),
      minLengthValue: helpers.withMessage(
        "SSN must be 11 characters",
        minLength(11)
      ),
      maxLengthValue: helpers.withMessage(
        "SSN must be 11 characters",
        maxLength(11)
      ),
    },
    address: {
      required: helpers.withMessage("Address line 1 is required", required),
    },
    city: { required: helpers.withMessage("City is required", required) },
    state: { required: helpers.withMessage("State is required", required) },
    zipcode: { required: helpers.withMessage("Zipcode is required", required) },
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
  },
  { immediate: true }
);

onMounted(() => {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  maxDate.value = date;
  formData.value.date_of_birth = date;
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-between border-b pb-1">
      <h3 class="text-xl font-semibold">Personal Details</h3>

      <button class="btn-primary text-xs md:text-base" type="submit">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div style="height: calc(100vh - 260px)">
      <div class="overflow-auto h-full pb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-3">
          <!-- <CustomFileDragnDrop label="Image" >

          </CustomFileDragnDrop> -->

          <!-- <CustomFileUplaod>
            
          </CustomFileUplaod> -->

          <!-- <CustomUpload></CustomUpload> -->

          <CustomInputContainer
            label="First Name"
            required
            :error="v$.first_name.$error"
            :errorMessage="v$.first_name.$errors[0]?.$message"
          >
          
            <InputText
              v-model="formData.first_name"
              @blur="v$.first_name.$touch"
              :invalid="v$.first_name.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Last Name"
            required
            :error="v$.last_name.$error"
            :errorMessage="v$.last_name.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.last_name"
              @blur="v$.last_name.$touch"
              :invalid="v$.last_name.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Email"
            required
            :error="v$.email.$error"
            :errorMessage="v$.email.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.email"
              @blur="v$.email.$touch"
              :invalid="v$.email.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Phone Number"
            required
            :error="v$.phone_number.$error"
            :errorMessage="v$.phone_number.$errors[0]?.$message"
          >
            <InputText
              type="number"
              v-model="formData.phone_number"
              @blur="v$.phone_number.$touch"
              :invalid="v$.phone_number.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="ID Type"
            required
            :error="v$.id_type.$error"
            :errorMessage="v$.id_type.$errors[0]?.$message"
          >
            <Select
              v-model="formData.id_type"
              :options="idTypes"
              optionLabel="label"
              optionValue="value"
              @blur="v$.id_type.$touch"
              :invalid="v$.id_type.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="ID Number"
            required
            :error="v$.id_number.$error"
            :errorMessage="v$.id_number.$errors[0]?.$message"
          >
            <InputText
              type="number"
              v-model="formData.id_number"
              @blur="v$.id_number.$touch"
              :invalid="v$.id_number.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Date of Birth"
            required
            :error="v$.date_of_birth.$error"
            :errorMessage="v$.date_of_birth.$errors[0]?.$message"
          >
            <DatePicker
              v-model="formData.date_of_birth"
              panelClass="form_calendar"
              :maxDate="maxDate"
              dateFormat="yy-mm-dd"
              showIcon
              @blur="v$.date_of_birth.$touch"
              :invalid="v$.date_of_birth.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="SSN"
            required
            :error="v$.ssn.$error"
            :errorMessage="v$.ssn.$errors[0]?.$message"
          >
            <!-- <InputText v-model="formData.ssn" @blur="v$.ssn.$touch" :invalid="v$.ssn.$error" /> -->
            <!-- <InputMask id="ssn" v-model="value1" mask="999-99-9999" placeholder="999-99-9999" fluid /> -->
            <InputMask
              v-model="formData.ssn"
              mask="999-99-9999"
              placeholder="###-###-####"
              @blur="v$.ssn.$touch"
              :invalid="v$.ssn.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Address Line 1"
            required
            :error="v$.address.$error"
            :errorMessage="v$.address.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.address"
              @blur="v$.address.$touch"
              :invalid="v$.address.$error"
            />
          </CustomInputContainer>

          <!-- <CustomInputContainer label="Address Line 2">
            <InputText v-model="formData.address_line_2" />
          </CustomInputContainer> -->

          <CustomInputContainer
            label="City"
            required
            :error="v$.city.$error"
            :errorMessage="v$.city.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.city"
              @blur="v$.city.$touch"
              :invalid="v$.city.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="State"
            required
            :error="v$.state.$error"
            :errorMessage="v$.state.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.state"
              @blur="v$.state.$touch"
              :invalid="v$.state.$error"
            />
          </CustomInputContainer>

          <CustomInputContainer
            label="Zipcode"
            required
            :error="v$.zipcode.$error"
            :errorMessage="v$.zipcode.$errors[0]?.$message"
          >
            <InputText
              v-model="formData.zipcode"
              @blur="v$.zipcode.$touch"
              :invalid="v$.zipcode.$error"
            />
          </CustomInputContainer>
        </div>
      </div>
    </div>
  </form>
</template>
