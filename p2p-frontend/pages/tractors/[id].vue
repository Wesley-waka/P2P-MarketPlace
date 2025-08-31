<template>
    <Navbar />
    
    <div class="max-w-[84rem] mx-auto">

        <div class="flex flex-row justify-between">
            <div class="flex flex-row">
                <img src="/public/Black/HT_ICONS_BLACK_RGB-36.png" class="h-[60px] w-[60px]"alt="">
                <h2>JohnDeere6R</h2>
            </div>
            <div class="flex flex-row space-x-5">
                <div>
                    <img src="/Sunset Blaze/HT_ICONS_ORANGE-50.png" class="h-[30px] w-[30px]" alt="">
                    <p class="font-manropeBold text-green-400" style="text-decoration: underline; text-decoration-color: green;">Share</p>
                </div>
                <div>
                    <img src="/Sunset Blaze/HT_ICONS_ORANGE-29.png" class="h-[30px] w-[30px]" alt="">
                    <p class="font-manropeBold" style="text-decoration: underline; text-decoration-color: green;">Share</p>
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-4">
                                            <!-- E/hr used -->
                                            <div class="flex flex-row space-x-1 items-center">
                                                <img src="/public/Black/Hello Tractor_RGB_BLACK_-Settings.png" class="h-[30px] w-[30px]" alt="" >
                                                <p>0 hrs</p>
                                            </div>
                                            <div class="flex flex-row space-x-1 items-center">
                                                <img src="/public/Black/Hello Tractor_RGB_BLACK_-Schedule.png" class="h-[30px] w-[30px]" alt="" >
                                                <p>9/2024</p>
                                            </div>
                                            <div class="flex flex-row space-x-1 items-center">
                                                <img src="/public/Black/HT_ICONS_BLACK_RGB-55.png" class="h-[30px] w-[30px]" alt="" >
                                                <p>125hp</p>
                                            </div>
                                            <div class="flex flex-row space-x-1 items-center">
                                                <img src="/public/Black/HT_ICONS_BLACK_RGB-56.png" class="h-[30px] w-[30px]" alt="" >
                                                <p>Hydraulic Cost</p>
                                            </div>
        
        </div>
        <div class="flex flex-row gap-3">
            <div class="p-1 bg-[#ff81a2] flex flex-row items-center  justify-around my-4 w-max rounded-md">
            <p class="font-manropeBold text-white text-sm">First Registration from 2023
            </p>
            </div>

          <div class="p-1 bg-[#ff81a2] flex flex-row items-center justify-around my-4 w-max rounded-md">
            <p class="font-manropeBold text-white text-sm">First Registration from 2023
            </p>
          </div>
        </div>

<!--        <div>-->
<!--            -->
<!--            <img src="../../assets/images/JohnDeere6R.png" alt="">-->
<!--        </div>-->

      <swiper
          :slides-per-view="3"
          :space-between="50"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
      >

        <swiper-slide>
          <img src="../../assets/images/JohnDeere6R.png" alt="">
        </swiper-slide>

        <swiper-slide>
          <img src="../../assets/images/JohnDeere6R.png" alt="">
        </swiper-slide>

        <swiper-slide>
          <img src="../../assets/images/JohnDeere6R.png" alt="">
        </swiper-slide>

      </swiper>

        <div class="flex flex-row">

        <div>
            <h2>
                Details
            </h2>

          <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-row align-middle items-center">
              <img src="/Black/HT_ICONS_BLACK_RGB-63.png" alt="engine_hrs_used" height="90" width="80"/>
              <div>
                <h5>Engine/hr used</h5>
                <h3>300 hrs</h3>
              </div>
            </div>

            <div class="flex flex-row align-middle items-center">
              <img src="/Black/HT_ICONS_BLACK_RGB-63.png" alt="engine_hrs_used" height="90" width="80"/>
              <div>
                <h5>Engine/hr used</h5>
                <h3>300 hrs</h3>
              </div>
            </div>

            <div class="flex flex-row align-middle items-center">
              <img src="/Black/HT_ICONS_BLACK_RGB-63.png" alt="engine_hrs_used" height="90" width="80"/>
              <div>
                <h5>Engine/hr used</h5>
                <h3>300 hrs</h3>
              </div>
            </div>

            <div class="flex flex-row align-middle items-center">
              <img src="/Black/HT_ICONS_BLACK_RGB-63.png" alt="engine_hrs_used" height="90" width="80"/>
              <div>
                <h5>Engine/hr used</h5>
                <h3>300 hrs</h3>
              </div>
            </div>

            <div class="flex flex-row align-middle items-center">
              <img src="/Black/HT_ICONS_BLACK_RGB-63.png" alt="engine_hrs_used" height="90" width="80"/>
              <div>
                <h5>Engine/hr used</h5>
                <h3>300 hrs</h3>
              </div>
            </div>

            <div class="flex flex-row align-middle items-center">
              <img src="/Black/HT_ICONS_BLACK_RGB-63.png" alt="engine_hrs_used" height="90" width="80"/>
              <div>
                <h5>Engine/hr used</h5>
                <h3>300 hrs</h3>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-16 mt-6">
            <!-- First column - General -->
            <div>
              <h2>General</h2>
              <div class="flex flex-row align-middle items-center gap-2 mt-2">
                <h2>Vehicle ID</h2>
                <p>JohnDeere6R</p>
              </div>
              <div class="flex flex-row align-middle items-center gap-2">
                <h2>Make</h2>
                <p>JohnDeere6R</p>
              </div>
              <div class="flex flex-row align-middle items-center gap-2">
                <h2>Model</h2>
                <p>JohnDeere6R</p>
              </div>
              <div class="flex flex-row align-middle items-center gap-2">
                <h2>Body Color</h2>
                <p>JohnDeere6R</p>
              </div>
            </div>

            <!-- Second column - Engine -->
            <div>
              <h2>Engine</h2>
              <div class="flex flex-row align-middle items-center gap-2 mt-2">
                <h2>Engine Capacity</h2>
                <p>JohnDeere6R</p>
              </div>
              <div class="flex flex-row align-middle items-center gap-2">
                <h2>Consumption(comb.)</h2>
                <p>JohnDeere6R</p>
              </div>
              <div class="flex flex-row align-middle items-center gap-2">
                <h2>CO2 emissions</h2>
                <p>JohnDeere6R</p>
              </div>
              <div class="flex flex-row align-middle items-center gap-2">
                <h2>Emission class</h2>
                <p>JohnDeere6R</p>
              </div>
            </div>



<!--                <button class="btn btn-secondary outlined">-->
<!--                    match-->
<!--                </button>-->
            </div>


          <div class="mt-4">
            <h2>Features</h2>
            <h5>Exterior</h5>
            <p>JohnDeere6R</p>
            <p>JohnDeere6R</p>
            <p>JohnDeere6R</p>


            <h5 class="mt-2">Interior</h5>
            <p>JohnDeere6R</p>
            <p>JohnDeere6R</p>
            <p>JohnDeere6R</p>

            <h5 class="mt-2">Others</h5>
            <p>JohnDeere6R</p>
            <p>JohnDeere6R</p>


          </div>

          <div class="mt-4">
            <h2>Overall Performace Comparison</h2>
          </div>

          <div class="flex flex-row items-center space-x-12">
            <apexchart type="radialBar" height="350" :options="options" :series="series"></apexchart>
            <apexchart type="radialBar" height="350" :options="options" :series="series"></apexchart>
            <apexchart type="radialBar" height="350" :options="options" :series="series"></apexchart>
            <apexchart type="radialBar" height="350" :options="options" :series="series"></apexchart>

          </div>
        </div>

          <div>
            <div class="h-[80px] w-[80px] bg-amber-100">
              <p>Width</p>
            </div>
          </div>

        </div>

    </div>

    <!-- images -->
 

    <Footer />
</template>



<script setup >
import {Swiper,SwiperSlide} from 'swiper/vue';
import 'swiper/css'
// import apexchart from 'apexcharts';
const route = useRoute();
const dataList = ref([]);
const { $toast } = useNuxtApp();
const { fetchCart, updateItem, removeItem } = useFavouriteStore();
const cartStore = useFavouriteStore();
const { addToCart } = useFavouriteAPI();
import VueApexCharts from 'vue3-apexcharts';

const options = ref({
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Cricket']
});

const series = ref([
  70
]);

const fetchTractorData = async () => {
  dataLoading.value = true;
  await getAllTractors({
    page: page.value,
    pageSize: pageSize.value,
    search: searchText.value,
  })
    .then((res) => {
      dataList.value = res.data;
      totalSize.value = res.result || 0;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dataLoading.value = false;
      dataLoaded.value = true;
    });
};

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
}

onMounted(() => {
    fetchTractorData();
});



// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)

</script>
