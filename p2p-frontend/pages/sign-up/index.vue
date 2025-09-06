<template>
  <div class="flex w-full h-screen">
    <div class="w-3/5 h-full">
      <video
          class="w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
      >
        <source src="/hero-vid.mp4" type="video/mp4">
      </video>
    </div>


        <div class="w-2/5 h-full flex flex-col justify-center my-auto align-middle ">
          <div class="w-full h-full p-4 ">
            <div v-if="user_selector" class="mt-44">
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
                    {{ userTypeValue == 'buyer' ? 'Join as Buyer' : 'Join as Seller' }}
                  </button>
                </div>
              </div>
            </div>

            <div v-if="sign_up">
              <UserSignUp />
            </div>
          </div>
        </div>

  </div>
</template>

<script setup>

import {computed, ref} from "vue";
const userTypeValue = ref('');
const user_selector = ref(true)
const userType = computed(() => {
  return userTypeValue.value;
});

const setUserType = (type) => {
  userTypeValue.value = type;
}
</script>