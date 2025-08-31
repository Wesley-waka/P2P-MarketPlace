<template>

    <div class="w-full h-[600px]">
        <h1 class="text-2xl text-center">Sign up to hire talent</h1>
        <div class="mt-4">
            <Divider layout="vertical" class="!hidden md:!flex"><b>OR</b></Divider>
            <div class="max-w-[400px] mx-auto my-6">
                <form @submit.prevent="handleSignUpSubmit">
                    <div>
                        <CustomInputContainer label="Images" required :error="v$.src.$error"
                            :errorMessage="v$.src.$errors[0]?.$message">
                            <div class="card flex flex-col items-center gap-6">
                                <img v-if="src" :invalid="v$.src.$error" :src="src" alt="Image"
                                    class="shadow-md rounded-full w-40" />
                                <div v-else class="outlined">
                                    <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-32.png" class="w-40" alt="">
                                </div>
                                <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                                    class="p-button-outlined">
                                    <template #uploadicon>
                                        <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-29.png" alt="">
                                    </template>
                                    <template #content>
                                        <span class="p-button-label">Upload</span>
                                    </template>
                                </FileUpload>
                            </div>
                        </CustomInputContainer>
                    </div>
                    <div class="flex flex-row space-x-2 w-full">
                        <CustomInputContainer label="First Name" required :error="v$.first_name.$error"
                            :errorMessage="v$.first_name.$errors[0]?.$message" class="w-1/2">
                            <InputText v-model="formDataSignUp.first_name" @blur="v$.first_name.$touch"
                                :invalid="v$.first_name.$error" />
                        </CustomInputContainer>
                        <CustomInputContainer label="Last Name" required :error="v$.last_name.$error"
                            :errorMessage="v$.last_name.$errors[0]?.$message" class="w-1/2">
                            <InputText v-model="formDataSignUp.last_name" @blur="v$.last_name.$touch"
                                :invalid="v$.last_name.$error" />
                        </CustomInputContainer>
                    </div>
                    <CustomInputContainer label="Email" required :error="v$.email.$error"
                        :errorMessage="v$.email.$errors[0]?.$message">
                        <InputText v-model="formDataSignUp.email" @blur="v$.email.$touch" :invalid="v$.email.$error" />
                    </CustomInputContainer>
                    <CustomInputContainer label="Phone Number" required :error="v$.phone_number.$error"
                        :errorMessage="v$.phone_number.$errors[0]?.$message">
                        <InputText type="number" v-model="formDataSignUp.phone_number" @blur="v$.phone_number.$touch"
                            :invalid="v$.phone_number.$error" />
                    </CustomInputContainer>
                    <div class="flex flex-row space-x-2 w-full">
                        <CustomInputContainer label="ID Type" required class="w-1/2" :error="v$.id_type.$error"
                            :errorMessage="v$.id_type.$errors[0]?.$message">
                            <Select v-model="formDataSignUp.id_type" :options="idTypes" optionLabel="label"
                                optionValue="value" @blur="v$.id_type.$touch" :invalid="v$.id_type.$error" />
                        </CustomInputContainer>
                        <CustomInputContainer label="ID Number" required class="w-1/2" :error="v$.id_number.$error"
                            :errorMessage="v$.id_number.$errors[0]?.$message">
                            <InputText type="number" v-model="formDataSignUp.id_number" @blur="v$.id_number.$touch"
                                :invalid="v$.id_number.$error" />
                        </CustomInputContainer>
                    </div>
                    <button class="btn btn-primary w-full my-4">Sign Up</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import useVuelidate from "@vuelidate/core";
import { email, required, minLength, maxLength } from "@vuelidate/validators";
import { useAuth } from '@/composables/useAuth';

const { $toast } = useNuxtApp();

const formDataSignUp = ref({
    first_name: "",
    last_name: "",
    src: "",
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
    location: "",
});

const idTypes = [
    { label: "National ID", value: "national_id" },
    { label: "Driver's License", value: "drivers_license" },
    { label: "International Passport", value: "international_passport" },
];

const validationRules = {
    first_name: { required },
    last_name: { required },
    src: { required },
    email: { required, email },
    phone_number: { required },
    id_type: { required },
    id_number: { required },
};

const v$ = useVuelidate(validationRules, formDataSignUp);

const handleSignUpSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$error) {
        $toast.error("Please fill in the required fields");
        return;
    }
    try {
        await useAuth().signUp(formDataSignUp.value);
        $toast.success("Registration successful. Please check your email for login details");
        router.push("/auth/login");
    } catch (err) {
        $toast.error("Registration failed");
        console.error(err);
    }
};

const onFileSelect = (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        formDataSignUp.value.src = e.target.result;
    };
    reader.readAsDataURL(file);
};
</script>