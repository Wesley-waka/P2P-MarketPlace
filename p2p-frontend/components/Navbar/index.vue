<template>
  <div class="bg-white mx-auto justify-center">
    <div class="h-16 p-2 flex space-x-8 align-middle max-w-[84rem] px-6 mx-auto px-10 justify-between">
      <div class="flex flex-row space-x-5 align-middle">
        <NuxtLink to="/">
         <img class="h-10" :src="extractPhotos('/../../assets/images/logo_medium.png')" alt="">
       </NuxtLink>
        <div class="flex flex-row space-x-5 mt-3">
          <h3><NuxtLink to="/tractors">Buy</NuxtLink></h3>
          <h3><NuxtLink @click.prevent="navigateToSection('#how_works', '/')">Sell</NuxtLink></h3>
          <h3><NuxtLink @click.prevent="navigateToSection('#how_works', '/')" to='/#how_works'>How it works</NuxtLink></h3>
          <h3><NuxtLink @click.prevent="navigateToSection('#service', '/')" to='/#service'>Services</NuxtLink></h3>
          <h3><NuxtLink to='/dealers'>Dealers</NuxtLink></h3>
          <h3><NuxtLink @click.prevent="navigateToSection('#contact_us', '/')" to='/#contact_us'>Contact Us</NuxtLink></h3>
        </div>
      </div>
      <div class="flex space-x-4 mt-3 items-center">
        <NuxtLink to="/messages">
          <img :src="extractPhotos('/public/Black/HT_ICONS_BLACK_RGB-71.png')" class="w-[50px]" alt="">
        </NuxtLink>
<!--        <NuxtLink to='/favourites'><i class="pi pi-heart" style="font-size: 1.5rem"></i></NuxtLink>-->

        <div class="flex align-middle mx-auto space-x-2" @click="visible = true">
          <img :src="extractPhotos('/login.svg')" class="h-8" alt="">
          <h3 class="mt-1" v-if="user"><NuxtLink to="/login">Logout</NuxtLink></h3>
          <h3 class="mt-1" v-else><NuxtLink to="/login">Login</NuxtLink></h3>
        </div>
      </div>
    </div>
  </div>
  <hr>

</template>

<script setup>
import moment from 'moment';
import useVuelidate from "@vuelidate/core";
import { email, required, helpers, minLength, maxLength } from "@vuelidate/validators";
// import { useAuth } from '../../composables/useAuth.js';
import { useNuxtApp, useRouter } from '#app';
import { ref, computed, onMounted } from 'vue';

const { user,checkAuthStatus } = useAuthStore();

const location = ref(['36.811667', '-1.266944']);
// const email = ref("");
const password = ref("");
const loading = ref(false);

const dataLoading = ref(false);
const current = ref(false);
const next = ref(false);
const src = ref(null);
const visible = ref(false);
const { $toast } = useNuxtApp();
const router = useRouter();
const userTypeValue = ref('');

    
    // Function to handle smooth scrolling and cross-page navigation
    const navigateToSection = (sectionId, path = null) => {
      // If path is provided and different from current path, navigate first
      if (path && router.currentRoute.value.path !== path) {
        // Navigate to the specified path
        router.push(path).then(() => {
          // After navigation, scroll to the section
          nextTick(() => {
            scrollToSection(sectionId)
          })
        })
      } else {
        // If already on the correct page, just scroll to the section
        scrollToSection(sectionId)
      }
    }
    
    // Smooth scrolling function
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Smooth scroll with offset (optional)
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
    
    // Handle route query parameters for section navigation
    onMounted(() => {
      const { section } = router.currentRoute.value.query
      if (section) {
        scrollToSection(section)
      }
      checkAuthStatus();
    })
    



</script>