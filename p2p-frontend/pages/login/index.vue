<template>
  <div class="flex w-full h-screen"> <!-- Parent div with full width and height -->
    <!-- First child div (1/4 width) containing video -->
    <div class="w-3/5 h-full">
      <video class="w-full h-full object-cover" autoplay muted loop playsinline>
        <source :src="extractPhotos('/hero-vid.mp4')" type="video/mp4">
      </video>
    </div>

    <!-- Second child div (3/4 width) containing form -->
    <div class="w-2/5 h-full">
      <div class="w-full h-full p-4">
        <!-- Your form content here -->


        <!-- LOGIN FORM -->
        <div v-if="sign_in" class="h-full overflow-auto flex flex-col">
          <div class="flex items-center mx-auto px-3">
            <img :src="extractPhotos('/logo.png')" alt="logo" class="h-12 mb-4" />

            <div class="flex items-center gap-1">

            </div>
          </div>

          <div class="my-auto flex flex-col space-y-2">

            <form class="m-auto max-w-[400px] flex-grow space-y-3" @submit.prevent="handleSignInSubmit">
              <div>
                <h1 class="text-2xl font-semibold text-center">Login</h1>
                <p class="text-center text-gray-500 mb-6">
                  Login to your account to continue
                </p>
              </div>
              <CustomInputContainer label="Email" required :error="v$.email.$error"
                :errorMessage="v$.email.$errors[0]?.$message">
                <InputGroup>
                  <InputGroupAddon>
                    <i class="fas fa-envelope"></i>
                  </InputGroupAddon>
                  <InputText v-model="formDataLogin.email" placeholder="Email Address" @blur="v$.email.$touch()"
                    :invalid="v$.email.$error" />
                </InputGroup>
              </CustomInputContainer>
              <CustomInputContainer label="Password" required:error="v$.password.$error"
                :errorMessage="v$.password.$errors[0]?.$message">
                <InputGroup>
                  <InputGroupAddon>
                    <i class="fas fa-lock"></i>
                  </InputGroupAddon>
                  <Password v-model="formDataLogin.password" toggleMask :feedback="false" placeholder="Password"
                    @blur="v$.password.$touch()" :invalid="v$.password.$error" />
                </InputGroup>
              </CustomInputContainer>
              <div class="flex justify-between flex-col space-y-2 items-center w-full">

                <button class="w-full btn btn-primary" type="submit" :disabled="loading">
                  <i v-if="loading" class="animate-spin mr-2 pi pi-spinner"></i>
                  Login
                </button>


              </div>
            </form>

            <Divider align="center" type="solid" class="mt-6">
              <b>or</b>
            </Divider>

            <div class="items-center">
              <button
                class="w-full btn btn-primary outlined max-w-[254px] items-center mx-auto align-middle flex justify-around">
                <img :src="extractPhotos('/google.png')" alt="google-sign-in" class="w-[30px] h-[30px]">
                Sign in with Google
              </button>
              <div class="text-center mt-4">Don't have an account? <a href="/sign-up" class="text-blue-700">Sign Up</a>
              </div>

            </div>


            <!--              <button class="w-full btn btn-primary outlined max-w-[254px] items-center mx-auto"-->
            <!--                      @click="sign_in = false, user_selector = true" :disabled="loading">-->
            <!--                Sign Up-->
            <!--              </button>-->
          </div>
        </div>





        <!-- USER TYPE SELECTOR -->
        <div v-if="user_selector">
          <div class="w-full mx-auto">
            <h1 class="text-2xl text-center">Join as a Buyer or Seller</h1>
            <div class="flex flex-row justify-around my-12">
              <div
                :class="`w-[300px] ${userType === 'buyer' ? 'border-orangeBright border-2 shadow-2xl' : ''} h-[140px] py-2 px-4 bg-slate-100 rounded-lg`"
                @click="setUserType('buyer')">
                <div>
                  <img :src="extractPhotos('/public/Black/Hello Tractor_RGB_BLACK_-User.png')" class="w-[50px]" alt="">
                </div>
                <p class="font-manropeSemiBold">Buyer,Buy farm equipment <br>and other products</p>
              </div>

              <div
                :class="`w-[300px] h-[140px] py-2 ${userType === 'seller' ? 'border-orangeBright border-2 shadow-2xl' : ''} px-4 bg-slate-100 rounded-lg`"
                @click="setUserType('seller')">
                <div>
                  <img :src="extractPhotos('/public/Black/HT_ICONS_BLACK_RGB-02.png')" class="w-[50px]" alt="">
                </div>
                <p class="font-manropeSemiBold">Seller, Sell used Tractors <br>and other products</p>
              </div>



            </div>

            <div class="flex flex-col items-center justify-center w-full">
              <button class="btn btn-primary w-[300px]" @click="user_selector = false, sign_up = true">
                {{ buyer ? 'Join as aBuyer' : 'Join as seller' }}
              </button>
            </div>
          </div>
        </div>
        <!-- SIgn Up form -->

        <div v-if="sign_up">

          <UserSignUp />
        </div>









        <!-- <Stepper :value="currentStep" linear @update:value="currentStep = $event">
              <StepList>
                <Step value="1" :class="{ 'p-complete': Number(currentStep) > 1 }">
                  Personal Details
                </Step>
                <Step value="2" :class="{ 'p-complete': Number(currentStep) > 2 }">
                  Business Details
                </Step>
                <Step value="3" :class="{ 'p-complete': Number(currentStep) > 3 }">
                  Product Selection
                </Step>
                <Step value="4" :class="{ 'p-complete': Number(currentStep) > 4 }">
                  Validation
                </Step>
              </StepList>

              <StepPanels class="border rounded-md overflow-auto !py-2" style="height: calc(100vh - 200px)">
                <StepPanel v-slot="{ activateCallback }" value="1">
                  <AuthPersonal :data="personal" @update="(data) => { personal.value = data; activateCallback('2'); }" />
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" value="2">
                  <AuthBusiness :data="business" @back="activateCallback('1')" @update="(data) => { business.value = data; activateCallback('3'); }" />
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" value="3">
                  <AuthProducts :data="products" @back="activateCallback('2')" @update="(data) => { products.value = data; activateCallback('4'); }" />
                </StepPanel>

                <StepPanel value="4">
                  <div class="px-0 text-sm">
                    <div class="flex justify-between items-center py-1 mt-1 border-b">
                      <button type="button" @click="currentStep = '2'" class="btn-dark">
                        <i class="fas fa-chevron-left"></i> Back
                      </button>

                      <button type="button" class="btn-primary" :disabled="isLoading || !terms" @click="handleSubmit">
                        {{ isLoading ? "Loading..." : "Submit" }}
                      </button>
                    </div>

                    <div style="height: calc(100vh - 300px)">
                      <div class="overflow-auto h-full pb-6 pt-1">
                        <h4 class="text-lg font-semibold bg-gray-100 px-2">Personal Details</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                          <div class="flex space-x-1">
                            <span>First Name:</span>
                            <span class="font-semibold">{{ personal.first_name }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Last Name:</span>
                            <span class="font-semibold">{{ personal.last_name }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Email:</span>
                            <span class="font-semibold">{{ personal.email }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Phone:</span>
                            <span class="font-semibold">{{ personal.phone_number }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Date of Birth:</span>
                            <span class="font-semibold">{{ moment(personal.date_of_birth).format("ll") }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>ID/Passport Number:</span>
                            <span class="font-semibold">{{ personal.id_number }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Address 1:</span>
                            <span class="font-semibold">{{ personal.address }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Address 2:</span>
                            <span class="font-semibold">{{ personal.address_line_2 }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>City:</span>
                            <span class="font-semibold">{{ personal.city }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Country:</span>
                            <span class="font-semibold">{{ personal.state }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Zipcode:</span>
                            <span class="font-semibold">{{ personal.zipcode }}</span>
                          </div>
                        </div>

                        <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Next of Kin</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                          <div class="flex space-x-1">
                            <span>First Name:</span>
                            <span class="font-semibold">{{ business.next_of_kin_first_name }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Last Name:</span>
                            <span class="font-semibold">{{ business.next_of_kin_last_name }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Phone:</span>
                            <span class="font-semibold">{{ business.next_of_kin_phone_number }}</span>
                          </div>
                        </div>

                        <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Sponsor Information</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                          <div class="flex space-x-1">
                            <span>Number:</span>
                            <span class="font-semibold">{{ business.sponsor_number }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Name:</span>
                            <span class="font-semibold">{{ business.sponsor_name }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Phone:</span>
                            <span class="font-semibold">{{ business.sponsor_phone_number }}</span>
                          </div>
                        </div>

                        <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Upline Distributor's Information</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                          <div class="flex space-x-1">
                            <span>Number:</span>
                            <span class="font-semibold">{{ business.upline_number }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Name:</span>
                            <span class="font-semibold">{{ business.upline_name }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <span>Phone:</span>
                            <span class="font-semibold">{{ business.upline_phone_number }}</span>
                          </div>
                        </div>

                        <h4 class="text-lg font-semibold bg-gray-100 px-2 mt-3">Products</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1.5 px-2">
                          <template v-for="product in products" :key="product._id">
                            <div class="flex space-x-1">
                              <span>{{ product?.title }} ({{ product?.selectedQty }})</span>
                            </div>
                          </template>
</div>
</div>

<div class="mt-2 pt-2 flex items-center border-t">
  <Checkbox v-model="terms" binary />
  <span class="ml-2 text-sm">
    I agree to the <NuxtLink to="#" class="text-blue-800 underline">terms and conditions</NuxtLink>
  </span>
</div>
</div>
</div>
</StepPanel>
</StepPanels>
</Stepper> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic goes here
import { computed, onMounted, ref } from "vue";
import { email, helpers, required } from "@vuelidate/validators";
const { login, signUp } = useAuth();
import useVuelidate from "@vuelidate/core";
const { $toast } = useNuxtApp();
const router = useRouter();

const loading = ref(false);

const { $socket } = useNuxtApp()

const sign_in = ref(true);
const user_selector = ref(false);
const sign_up = ref(false);
const current = ref(false);




const formDataLogin = ref({
  email: "",
  password: "",
});



const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Email Address is required", required),
    email: helpers.withMessage("Invalid Email Address", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
}));

const v$ = useVuelidate(rules, formDataLogin);

const personal = ref({
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

const business = ref({
  next_of_kin_first_name: "",
  next_of_kin_last_name: "",
  next_of_kin_phone_number: "",
  sponsor_number: "",
  sponsor_name: "",
  sponsor_phone_number: "",
  upline_number: "",
  upline_name: "",
  upline_phone_number: "",
  next_of_kin_email: "",
});

const products = ref([]);
const terms = ref(false);
const currentStep = ref("1");
const isLoading = ref(false);


const auth_user = useAuth()
// const {user} = useAuthStore();
const logStore = useAuthStore()

// const fetchLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         // const { latitude, longitude } = position.coords;
//         // reverseGeocode(latitude, longitude);
//       },
//       (error) => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             location.value = "User denied the request for Geolocation.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             location.value = "Location information is unavailable.";
//             break;
//           case error.TIMEOUT:
//             location.value = "The request to get user location timed out.";
//             break;
//           case error.UNKNOWN_ERROR:
//             location.value = "An unknown error occurred.";
//             break;
//         }
//       }
//     );
//   } else {
//     location.value = "Geolocation is not supported by this browser.";
//   }
// };

const handleSignInSubmit = async () => {
  console.log(formDataLogin.value, 'this is the form data');
  loading.value = true;
  v$.value.$touch();

  if (v$.value.$error) {
    $toast.error("Please fill in the required fields");
    loading.value = false;
    return;
  }


  try {
    const user = await logStore.login(formDataLogin.value);
    console.log(user, 'this is the user');
    localStorage.setItem('user', JSON.stringify(user));
    // $toast.success("Login successful");
    router.push("/");
  } catch (error) {
    $toast.error("Email or password is incorrect!");
    console.log(error);
  } finally {
    loading.value = false;
  }

  // await logStore.login(formDataLogin.value)
  //   .catch((err) => {
  //     $toast.error("Email or password is incorrect!");
  //     console.log(err);
  //     if (!err) visible.value = false;
  //     loading.value = false;
  //     console.log(auth_user.error.value,'this is our user');


  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });

  console.log(logStore.user)
};

onMounted(() => {
  // fetchLocation();
  // reverseGeocode(-1.266944, 36.811667);
  // $socket.connect('123456');
});
</script>

<style scoped>
/* Component styles go here */
</style>