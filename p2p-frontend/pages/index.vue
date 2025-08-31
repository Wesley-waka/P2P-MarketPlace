<template>
  <div>
    <!-- Header -->
    <Navbar />
    <!-- Header -->

    <!-- Hero -->
    <div>
      <!-- <img src="../assets/images/hero-7.jpeg" class="h-[750px] bg-grad w-full object-cover" alt=""> -->
      <div class="hero-section">
        <div class="relative ml-40 right-0 top-20">
          <h1 class="text-white font-merriWeatherBold">You choose your car online. <br> We inspect it and deliver it
          </h1>
          <div class="rounded-lg w-[600px] bg-white mt-10 flex flex-col space-y-8 py-8 px-8 ">
            <div class="flex flex-row space-x-2">
              <CustomInputContainer label=" " class="w-[200px]">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Type" />
              </CustomInputContainer>
              <CustomInputContainer label=" " class="w-[200px]">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Brand" />
              </CustomInputContainer>
              <CustomInputContainer label=" " class="w-[200px]">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Engine hours" />
              </CustomInputContainer>
            </div>

            <div class="flex flex-row space-x-2">
              <CustomInputContainer label=" " class="w-1/2">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Registration From " />
              </CustomInputContainer>
              <CustomInputContainer label=" " class="w-1/2">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Price up To" />
              </CustomInputContainer>
            </div>

            <div class="flex justify-end">
              <button class="btn btn-primary">112 Offers</button>
            </div>
            <!-- <Select
            optionLabel="label"
            optionValue="value"
            /> -->

          </div>
        </div>
      </div>
      <div class="">
        <div
          class="w-[70rem] rounded-md absolute bg-[#e8f8fb] h-48 z-10 top-[50rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex py-[40px] px-[20px] gap-3">
          <div class="flex align-middle gap-3 my-auto">
            <img class="h-[40px]" src="/caraudit.svg" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Divider layout="vertical" />
          <div class="flex align-middle gap-3 my-auto">
            <img src="/finance.svg" class="h-[40px]" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Divider layout="vertical" />
          <div class="flex align-middle gap-3 my-auto">
            <img src="/legal.svg" class="h-[40px]" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>

      <div class="max-w-[84rem] px-6 mx-auto my-[12rem]">
        <div class="">
          <h1 class="font-manrope">Popular at Hello Tractor</h1>
        </div>
        <div class="mt-10 flex space-x-4">
          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">Sub-Compact</h2>
            <div><img src="../assets/images/mersey.png" class="h-[120px] w-[200px]" alt=""></div>
          </div>

          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">Utility</h2>
            <div><img src="../assets/images/Kubota.png" class="h-[120px] w-[200px]" alt=""></div>
          </div>

          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">Row crop</h2>
            <div><img src="../assets/images/JohnDeere6R.png" class="h-[120px] w-[200px]" alt=""></div>
          </div>
          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">Compact</h2>
            <div><img src="../assets/images/YanMar.png" class="h-[120px] w-[200px]" alt=""></div>
          </div>

          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">High Horse Power</h2>
            <div><img src="../assets/images/caseIH.png" class="h-[120px] w-[200px]" alt=""></div>
          </div>
        </div>
      </div>

      <section id="how_works" class="section">
        <div class="bg-[#e8f8fb] max-w-full mx-auto py-2 ">
          <div class="max-w-[84rem] px-6 mx-auto my-[100px]">
            <h1 class="">How it works</h1>
            <div class="flex flex-row justify-between my-32">
              <div class="w-[400px] flex flex-col justify-center align-middle">
                <img src="../assets/images/characters/Aziza Gesture.png" class="h-[270px]" alt="">
                <h4>01.</h4>
                <h2 class="mt-3">Choose anywhere in Europe</h2>
                <p class="w-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
              <div class="w-[400px] flex flex-col justify-center align-middle">
                <div class=" mx-auto">
                  <div class="">
                    <img src="../assets/images/speechBubble/HT_BRAND ASSETS_SOLID SPEECHBUBBLES_RGB_Sunset Blaze.png"
                      class="h-[140px] w-[140px]" alt="">
                    <img src="../assets/images/speechBubble/HT_BRAND ASSETS_SOLID SPEECHBUBBLES_RGB_Plum.png"
                      class="flip-horizontal h-[140px] w-[140px] ml-12" alt="">
                  </div>
                </div>
                <h4>03.</h4>
                <h2 class="mt-3">We'll inspect the car closely</h2>
                <p class="w-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
              <div class="w-[400px] flex flex-col justify-center align-middle">
                <img src="../assets/images/characters/Caro Gesture.png" class="h-[270px]" alt="">
                <h4>04.</h4>
                <h2 class="mt-3">We'll inspect the car closely</h2>
                <p class="w-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="max-w-[84rem] px-6 mx-auto py-32">
        <div class="">
          <h1>By Brand</h1>
        </div>
        <div class="mt-20 flex space-x-4">
          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">CMC</h2>
            <div><img src="../assets/images/companies/logo.png" class="h-[100px] w-[120px]" alt=""></div>
          </div>
          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">CFAO Motors</h2>
            <div><img src="../assets/images/companies/mobilitylogo.png" class="h-[100px] w-[150px]" alt=""></div>
          </div>
          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">Mascor</h2>
            <div><img src="../assets/images/companies/Mascor.png" class="h-[100px] w-[150px]" alt=""></div>
          </div>
          <div
            class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col justify-center items-center space-y-2 mx-auto p-4">
            <h2 class="pt-3 font-manropeSemiBold text-lg">FMD</h2>
            <div><img src="../assets/images/companies/FMD_2C_RGB.webp" class="h-[120px] w-[200px]" alt=""></div>
          </div>

        </div>
      </div>

      <div class="bg-[#e8f8fb] max-w-full mx-auto  py-16 my-auto">
        <div class="max-w-[84rem] px-6 py-8 mx-auto">
          <div class="">
            <h1>By Budget</h1>
          </div>
          <div class=" flex space-x-4">
            <div class="mt-24 flex space-x-4">
              <div
                class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
                <h2 class="pt-3 font-manropeSemiBold text-lg">40,000 - 80,000 KES</h2>
                <div><img src="/Sunset Blaze/Hello Tractor_RGB_RED_-Payment.png" class="h-[100px] w-[100px]" alt="">
                </div>
              </div>
            </div>

            <div class="mt-24 flex space-x-4">
              <div
                class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
                <h2 class="pt-3 font-manropeSemiBold text-lg">90,000 - 120,000 KES</h2>
                <div><img src="/Sunset Blaze/Hello Tractor_RGB_RED_-Payment.png" class="h-[100px] w-[100px]" alt="">
                </div>
              </div>
            </div>

            <div class="mt-24 flex space-x-4">
              <div
                class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
                <h2 class="pt-3 font-manropeSemiBold text-lg">120,000 - 240,000 KES</h2>
                <div><img src="/Sunset Blaze/Hello Tractor_RGB_RED_-Payment.png" class="h-[100px] w-[100px]" alt="">
                </div>
              </div>
            </div>

            <div class="mt-24 flex space-x-4">
              <div
                class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
                <h2 class="pt-3 font-manropeSemiBold text-lg">240,000 - 270,000 KES</h2>
                <div><img src="/Sunset Blaze/Hello Tractor_RGB_RED_-Payment.png" class="h-[100px] w-[100px]" alt="">
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div class="max-w-[84rem] px-6 mx-auto py-24 ">
        <div class="">
          <h1>By Location</h1>
        </div>
        <div class="flex space-x-4">
          <div class="mt-24 flex space-x-4">
            <div
              class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
              <h2 class="pt-3 font-manropeSemiBold text-lg">Nairobi</h2>
              <div><img src="/Sunset Blaze/HT_ICONS_ORANGE-13.png" class="h-[100px] w-[100px]" alt=""></div>
            </div>

            <div
              class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
              <h2 class="pt-3 font-manropeSemiBold text-lg">Eldoret</h2>
              <div><img src="/Sunset Blaze/HT_ICONS_ORANGE-13.png" class="h-[100px] w-[100px]" alt=""></div>
            </div>

            <div
              class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
              <h2 class="pt-3 font-manropeSemiBold text-lg">Nanyuki</h2>
              <div><img src="/Sunset Blaze/HT_ICONS_ORANGE-13.png" class="h-[100px] w-[100px]" alt=""></div>
            </div>

            <div
              class="bg-white border-slate-200  shadow-md border-[0.75px] rounded-md w-[310px] h-[190px] flex flex-col-reverse justify-center items-center space-y-2 mx-auto p-4">
              <h2 class="pt-3 font-manropeSemiBold text-lg">Nakuru</h2>
              <div><img src="/Sunset Blaze/HT_ICONS_ORANGE-13.png" class="h-[100px] w-[100px]" alt=""></div>
            </div>


          </div>
        </div>
      </div>

      <section id="service" class="section">

        <div class="bg-[#e8f8fb] max-w-full mx-auto  py-6 my-16 ">
          <div class="max-w-[84rem] px-6 mx-auto">
            <h1 class="text-center">Servicing</h1>
            <div class="flex flex-row my-8 align-middle">
              <img src="../assets/images/characters/Wekeza Neutral.png" class="h-[400px]" alt="">
              <div class="flex flex-col space-y-6 my-auto">
                <div>
                  <h2>Get our top dealers and service maintainers to check your tractor</h2>
                  <p>Carvago will even finance cars from abroad, which is rare. Furthermore, we are able to do so purely
                    online and within few hours. Try out our financing calculator - there is no hidden fine print!</p>
                </div>
                <form class="pt-1 pb-6 flex flex-row space-x-3 items-center align-middle" @submit.prevent="handleSubmit">
                  <CustomInputContainer label="Email" required :error="v$.emailAddress.$error"
                    :errorMessage="v$.emailAddress.$errors[0]?.$message" class="w-[300px]">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="fas fa-envelope"></i>
                      </InputGroupAddon>
                      <InputText v-model="emailAddress" placeholder="Email Address" @blur="v$.emailAddress.$touch()"
                        :invalid="v$.emailAddress.$error" />
                    </InputGroup>
                  </CustomInputContainer>
                  <button class="btn btn-primary p-2 mt-6">
                    <i v-if="loading" class="animate-spin mr-2  pi pi-spinner"></i>Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dealers" class="section">
        <div class="max-w-[84rem] px-6 mx-auto text-center py-28">
          <h1> Comprehensive services just a few clicks away</h1>
          <div class="my-32 flex flex-row justify-around">
            <Card style="width: 23rem; height: 18rem; overflow: hidden; padding: 10px;">
              <template #content>
                <div class="flex flex-col justify-center align-middle">
                  <img alt="user header" class="w-[78px] h-[78px] bg-[#ecfcff] p-4 rounded-full mx-auto"
                    src="/caraudit.svg" />
                  <div class="mx-auto mt-4">Deal Allocators</div>
                </div>
                <div class="mt-4 mx-3 flex-col space-y-1">
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                </div>
              </template>
            </Card>
  
            <Card style="width: 23rem; height: 18rem; overflow: hidden; padding: 10px;">
              <template #content>
                <div class="flex flex-col justify-center align-middle">
                  <img alt="user header" class="w-[78px] h-[78px] bg-[#ecfcff] p-4 rounded-full mx-auto"
                    src="/caraudit.svg" />
                  <div class="mx-auto mt-4">Deal Allocators</div>
                </div>
                <div class="mt-4 mx-3 flex-col space-y-1">
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                </div>
              </template>
            </Card>
  
            <Card style="width: 23rem; height: 18rem; overflow: hidden; padding: 10px;">
              <template #content>
                <div class="flex flex-col justify-center align-middle">
                  <img alt="user header" class="w-[78px] h-[78px] bg-[#ecfcff] p-4 rounded-full mx-auto"
                    src="/caraudit.svg" />
                  <div class="mx-auto mt-4">Deal Allocators</div>
                </div>
                <div class="mt-4 mx-3 flex-col space-y-1">
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <img src="/White/HT_ICONS_WHITE_RGB-39.png" alt=""
                      class=" rounded-full w-[20px] h-[20px] bg-[#ff461e]">
  
                    <p>Complete with no fine hours</p>
                  </div>
  
                </div>
              </template>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact_us" class="section">
      
        <div class="bg-[#ecfcff] max-w-full mx-auto py-16 my-auto">
          <div class="max-w-[84rem] px-6 mx-auto flex justify-center align-middle">
            <div class="w-[800px] bg-white">
              <div class="flex flex-row justify-between p-10">
                <div class="flex flex-col space-y-4">
                  <h4>Your next car <br> is waiting for you here...</h4>
                  <button class="btn btn-primary">133 offers</button>
                </div>
                <img src="../assets/images/characters/Gitonga Neutral.png" class="h-[240px]" alt="">
              </div>
              <hr>
              <div class="bg-slate-50 flex flex-row justify-around py-8">
                <div>
                  <h3>Call us</h3>
                  <h3>+420 246 034 700</h3>
                  <h3>Mo–Su 8 am-8 pm</h3>
                </div>
                <div>
                  <h3>Email</h3>
                  <h3>+420 246 034 700</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="w-[70rem] mx-auto">
            <h1 class="mx-auto my-[50px] text-center">You are not risking anything when you buy a <br> vehicle on Carvago
            </h1>
            <div class="">
              <div class="rounded-lg bg-white h-48 z-10 flex py-[40px] px-[20px] gap-3 my-8 max-w-[84rem] mx-auto">
                <div class="flex align-middle gap-3 my-auto">
                  <img class="h-[40px]" src="/caraudit.svg" alt="">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <Divider layout="vertical" />
                <div class="flex align-middle gap-3 my-auto">
                  <img src="/finance.svg" class="h-[40px]" alt="">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <Divider layout="vertical" />
                <div class="flex align-middle gap-3 my-auto">
                  <img src="/legal.svg" class="h-[40px]" alt="">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- Hero -->

    <hr>

    <div class="h-[380px]">
      <div class="max-w-[84rem] mx-auto my-auto">
        <div class="h-[300px] align-bottom my-auto flex flex-row justify-between max-w-[65rem] items-center">
          <div>
            <img src="../assets/images/logo_medium.png" alt="" class="h-[70px]" srcset="">
            <div class="flex flex-row space-x-2 align-middle ">
              <p>HelloTractor </p>
              <div class="my-auto h-[2px] w-[1px] rounded-full p-2 bg-slate-200"></div>
              <p>All Rights reserved</p>
            </div>
            <div class="flex flex-row space-x-4">

            </div>

          </div>
          <div class="flex flex-row justify-between space-x-20">
            <div>
              <h2>HelloTractor</h2>
              <div>
                <p>Buy</p>
                <p>Reviews</p>
                <p>How it Works</p>
                <p>Site map</p>


              </div>
            </div>
            <div>
              <h2>Services</h2>
              <div>
                <p>Car Audit</p>
                <p>DDelivery</p>
                <p>Financing</p>
                <p>Waranty</p>


              </div>

            </div>
            <div>
              <h2>Company</h2>
              <div>
                <p>About Us</p>
                <p>Contact</p>
                <p>Terms of Use</p>
                <p>Whistleblowing</p>


              </div>
            </div>
          </div>
        </div>

        <hr>

        <p class="mt-4">We accept online payment as well as wire transfer</p>
      </div>


    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required, helpers } from "@vuelidate/validators";
import Cookies from 'js-cookie';

definePageMeta({
  layout: "default",
});

const logStore = useAuthStore()
console.log(logStore,'this is our user');


const emailAddress = ref("");
const loading = ref(false);

const filterformData = ref({
  idType: "",
});

const rules = computed(() => {
  return {
    emailAddress: {
      required: helpers.withMessage("Email Address is required", required),
      email: helpers.withMessage("Invalid Email Address", email),
    },
  };
});

console.log(Cookies.get('auth_token'), 'this is the token')

const v$ = useVuelidate(rules, { emailAddress });

const { $toast } = useNuxtApp();

const formData = ref({
  title: "",
  category: "",
  quantity: 0,
  price: 1,
  pv: 1,
  description: "",
  imageCover: null,
  images: [],
});




const handleSubmit = async () => {
  v$.value.$touch();
  loading.value = true;
  v$.value.$touch();

  if (v$.value.$error) {
    $toast.error("Please fill in the required fields");
    loading.value = false;
    return;
  }

  //   await signIn("credentials", {
  //     email: emailAddress.value,
  //     password: password.value,
  //     callbackUrl: "/",
  //   })
  //     .catch((err) => {
  //       $toast.error("Email or password is incorrect!");
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       loading.value = false;
  //     });

  console.log("Form submitted", emailAddress.value);
};

</script>

<style scoped>
.flip-horizontal {
  transform: scaleX(-1);

}

.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Adjust as needed */
}

.bg-grad {
  /* background-color: hsl(12, 100%, 56%); */
  background-image: radial-gradient(ellipse farthest-corner at right top, hsl(12, 100%, 97%) 10%, hsl(12, 100%, 96%) 25%, hsl(12, 100%, 82%) 54%, hsl(12, 100%, 56%) 100%);
  background-size: 'cover';

}

.hero-section {
  height: 750px;
  width: 100%;
  position: relative;
  background-image:
    radial-gradient(ellipse farthest-corner at right top,
      hsla(12, 100%, 97%, 0.3) 10%,
      /* More transparent at 10% */
      hsla(12, 100%, 96%, 0.4) 25%,
      /* More transparent at 25% */
      hsla(12, 100%, 82%, 0.85) 54%,
      /* Full opacity maintained */
      hsla(12, 100%, 56%, 0.85) 100%
      /* Full opacity maintained */
    ),
    url('../assets/images/hero-7.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
