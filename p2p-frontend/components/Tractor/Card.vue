<template>
  <div class="flex flex-row bg-white rounded-md space-x-3">
    <div class="w-2/6">
      <img :src="product.images[0]" alt="" class="bg-[#e8f8fb]">
    </div>
    <div class="w-4/6">
      <div class="flex flex-row justify-between">
        <h4 class="text-3xl my-1">{{ product.tractorName }}</h4>
        <div v-if="allProducts">
<!--          <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-50.png" class="w-[40px] h-full cursor-pointer" alt=""-->
<!--            @click="addToFavorites">-->
        </div>
        <div v-else class="flex flex-col space-y-2">
<!--          <button class="btn btn-primary outlined" @click="matchUser()">Connect with User</button>-->
<!--          <button class="btn btn-primary" @click="removeFromFavorites">Remove Favourite</button>-->
        </div>

        <button class="btn btn-primary outlined m-2" @click.prevent="matchUser()">Contact</button>
      </div>
      <div class="flex flex-row space-x-4 my-3">
        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/Hello Tractor_RGB_BLACK_-Settings.png" class="h-[30px] w-[30px]" alt="">
          <p>{{ product.engineHoursUsed }} hrs</p>
        </div>
        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/Hello Tractor_RGB_BLACK_-Schedule.png" class="h-[30px] w-[30px]" alt="">
          <p>{{ product.year }}</p>
        </div>
        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/HT_ICONS_BLACK_RGB-55.png" class="h-[30px] w-[30px]" alt="">
          <p>{{ product.HPCategory }}hp</p>
        </div>
        <div class="flex flex-row space-x-1 items-center">
          <img src="/public/Black/HT_ICONS_BLACK_RGB-56.png" class="h-[30px] w-[30px]" alt="">
          <p>Hydraulic Cost</p>
        </div>
      </div>
      <div class="flex flex-row space-x-4 mt-4">
        <div class="flex flex-row flex-wrap w-max space-x-2" v-for="item in product.exteriorFeatures" :key="item">
          <div class="p-1 bg-orange-200 flex flex-row items-center justify-around my-4 w-max rounded-md">
            <p class="font-manropeBold text-orangeTint text-[10px]">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-row space-x-48 items-center mt-2 w-full">
        <div class="flex flex-row">
          <img src="/public/Black/HT_ICONS_BLACK_RGB-05.png" class="h-[40px] w-[40px]" alt="">
          <div>
            <h4 class="text-lg">{{ product.location }}, delivery:</h4>
            <p>Nairobi</p>
          </div>
        </div>
        <div>
          <h3 class="font-merriWeatherBold">KES {{ product.cost }}</h3>
          <h3 class="text-sm">KES 300,000 without VAT</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// import {useAuthStore} from '../../stores/useAuthStore'
const router = useRouter();
const { $toast } = useNuxtApp();
const loading = ref(false);

const props = defineProps(["product", "allProducts"]);

// const authStore = useAuthStore()
// const currentUser = computed(() => authStore)
// console.log(currentUser, 'this is the current user')
const {user} = useAuthStore()
// const {user} = useAuthStore();
console.log(user,'this is our user');
const { addToFavourite, deleteFavourite } = useFavouriteStore();

// console.log(JSON.parse(localStorage.getItem('user')),'this is our user');

const addToFavorites = async () => {
  try {
    loading.value = true;
    await addToFavourite(props.product._id);
    $toast.success("Product added to favorites:");
    router.push("/tractors");
  } catch (error) {
    $toast.error("Error adding to favorites");
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const removeFromFavorites = async () => {
  try {
    const response = await deleteFavourite(props.product._id);

    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }

    const result = await response.json();
    console.log('Product removed from favorites:', result);
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

const matchUser = async () => {
  // router.push('/messages')
  console.log(user,'token here')

  try {
    const res = await useCustomFetch(
    `/messages/match?id=${props.product.createdByUser}&userId=${user._id}`, 
    { method: 'GET' },
    {
      contentType: 'application/json'
    }
  )
  
    console.log('API Response:', res);
    
    // Check if the response has a message property and it's not an error
    if (res && res.message && !res.error) {
      console.log('true redirect')
      $toast.success('User matched successfully')
      router.push('/messages')
    } else {
      console.log('false redirect - response:', res)
      throw new Error(res.error || 'Failed to match user')
    }
  
  } catch (error) {
    console.error('Error matching user:', error.message)
    $toast.error(error.message || 'Failed to match user')
  }
}
</script>