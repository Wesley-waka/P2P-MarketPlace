<template>
  <div>
    <Navbar />
    <div class="bg-slate-100 py-10 h-max">
      <div class=" max-w-[84rem] px-6 mx-auto grid grid-cols-4 gap-4 mb-4">
        <div class="col-span-1 bg-white rounded-md ">
          <!-- Content for the first child div -->
          <div class="flex flex-col space-y-2 border-b-2">
            <h2 class="p-2 px-6 font-manropeBold">Filter</h2>
            <div class="p-2 bg-orange-50 border-b-[5px] border-orange-200 shadow-md flex flex-col items-center">
              <img src="/Sunset Blaze/HT_ICONS_ORANGE-26.png" alt="" class="h-[30px] w-[30px]">
              <h2 class="font-manropeBold text-orange-500">All</h2>
            </div>
          </div>
          <div class="flex flex-col space-y-8 p-5">
            <div>
              <div class="my-4 py-2 border-b flex justify-between gap-2">
                <CustomSearch v-model="searchText" placeholder="Search Tractor" />
                <!-- <button
                            class="btn-secondary !rounded-full outlined text-xl !py-0 !px-1.5"
                          >
                            <i class="mdi mdi-filter" />
                          </button> -->
              </div>
              <h3 class="font-manropeBold">Brand</h3>
              <CustomInputContainer label="" class="w-[full]">
                <Select :options="BrandList" optionLabel="label" optionValue="value" placeholder="Track Brand" />
                <!-- <Select
                          v-model="filterformData.idType"
                          :options="idTypes"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Track Brand"
                        /> -->
              </CustomInputContainer>
            </div>
            <div>
              <h3 class="font-manropeBold">Location</h3>
              <CustomInputContainer label="" class="w-[full]">
                <Select :options="LocationList" optionLabel="label" optionValue="value" placeholder="Track Location" />
              </CustomInputContainer>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="flex flex-row justify-between align-middle items-center">
                <h3 class="font-manropeBold">Price(KES)</h3>
                <h6 class="p-[4px] rounded-md font-avenirBlack bg-orangeTint text-white">Cash</h6>
              </div>
              <div class="flex flex-row space-x-2">
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="priceList" optionLabel="label" optionValue="value" placeholder="From"
                    v-model="priceFrom" />
                </CustomInputContainer>
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="priceList" optionLabel="label" optionValue="value" placeholder="To"
                    v-model="priceTo" />
                </CustomInputContainer>
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="flex flex-row justify-between">
                <h3 class="font-manropeBold">Registration</h3>
              </div>
              <div class="flex flex-row space-x-2">
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="registrationFromList" optionLabel="label" optionValue="value" placeholder="From" />
                </CustomInputContainer>
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="registrationToList" optionLabel="label" optionValue="value" placeholder="To" />
                </CustomInputContainer>
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="flex flex-row justify-between">
                <h3 class="font-manropeBold">Engine hours used</h3>
              </div>
              <div class="flex flex-row space-x-2">
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="engineHoursFromList" optionLabel="label" optionValue="value" placeholder="From" />
                </CustomInputContainer>
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="engineHoursToList" optionLabel="label" optionValue="value" placeholder="To" />
                </CustomInputContainer>
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="flex flex-row justify-between">
                <h3 class="font-manropeBold">HP</h3>
              </div>
              <div class="flex flex-row space-x-2">
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="HPFromList" optionLabel="label" optionValue="value" placeholder="From" />
                </CustomInputContainer>
                <CustomInputContainer label="" class="flex flex-row space-x-2 w-[180px]">
                  <Select :options="HPToList" optionLabel="label" optionValue="value" placeholder="To" />
                </CustomInputContainer>
              </div>
            </div>
            <div>
              <h3 class="font-manropeBold">Track Type</h3>
              <CustomInputContainer label="" class="w-full">
                <Select :options="TrackTypeList" optionLabel="label" optionValue="value" placeholder="Track Type" />
              </CustomInputContainer>
            </div>
          </div>
        </div>
        <div class="col-span-3  px-4">
          <div class="w-full h-[50px] bg-white rounded-md">
            <div class="flex flex-row space-x-2 items-center rounded-md">
              <img src="/Sunset Blaze/Hello Tractor_RGB_RED_-Cart.png" class='w-[50px] p-2 bg-orange-50' alt="">
              <h3>Welcome to your one stop shop for tractors</h3>
            </div>
    
    
    <!--          {{dataList}}-->
            <div class="">
              <div class="p-1 bg-orange-200 flex flex-row items-center justify-around my-4 w-max rounded-md">
                <p class="font-manropeBold text-orangeTint text-[12px]">First Registration from 2023
                </p>
                <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-21.png" class="h-[20px] w-[20px]">
              </div>
              <div class="mt-2">
                <h2 class="font-manropeBold">Verified Cars</h2>
                <div class="flex flex-row justify-between">
                  <div class="mt-2">
                    <h3>300 results</h3>
                  </div>
                  <Paginator :alwaysShow="false" :rows="pageSize" :totalRecords="totalSize"
                    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} - {last} of {totalRecords}" @page="(e) => (page = e.page + 1)"
                    class="!rounded-b-xl border-t mt-3">
                  </Paginator>
                </div>
                <!-- <div class="grid gap-x-5 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                  v-if="dataLoading">
                  <LoaderProductCard v-for="n in 10" :key="n" />
                </div> -->
              </div>
              <!-- <TractorCard :all-products="true" /> -->
              <div v-if="dataList.length" class=" mb-8 w-full flex flex-col space-y-2 h-[800px]  overflow-y-auto">
                <div v-for="tractor in dataList" class="flex-row space-y-4" :key="tractor._id">
                  <TractorCard :product="tractor" @selectProduct="selectedProduct = product" :all-products="true" />
                </div>
              </div>
              <div v-else class="flex flex-col justify-center items-center h-full">
                <i class="fas fa-triangle-exclamation text-8xl text-gray-400" />
                <p class="text-3xl text-gray-400">No Data Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCompliance />
    </div>
    <Footer />
    <!-- <li v-for="product in products" :key="product.id">
          <nuxt-link :to="`/products/${product.id}`">{{ product.name }}</nuxt-link>
        </li> -->
  </div>

</template>

<script setup>
const dataList = ref([]);
const selectedProduct = ref(null);
const searchText = ref("");
const page = ref(1);
const brand = ref("");
const tractorType = ref("");
const priceTo = ref("");
const priceFrom = ref("");
const regFrom = ref("");
const regTo = ref("");
const engineHoursFrom = ref("");
const engineHoursTo = ref("");
const hpFrom = ref("");
const hpTo = ref("");
const trackType = ref("");
const dataLoading = ref(false);
const dataLoaded = ref(false);
const pageSize = ref(20);
const { getAllTractors } = useTractorsAPI();
const totalSize = ref(0);



const filterformData = ref({
  idType: { label: "Indo Farm", value: "indo-farm" },
});

const LocationList = ref([
  { label: "Nairobi", value: "nairobi" },
  { label: "Mombasa", value: "mombasa" },
  { label: "Kisumu", value: "kisumu" },
  { label: "Nakuru", value: "nakuru" },
  { label: "Eldoret", value: "eldoret" },
  { label: "Thika", value: "thika" },
  { label: "Kitale", value: "kitale" },
  { label: "Naivasha", value: "naivasha" },
  { label: "Machakos", value: "machakos" },
  { label: "Garissa", value: "garissa" },
  { label: "Kakamega", value: "kakamega" },
  { label: "Bungoma", value: "bungoma" },
  { label: "Meru", value: "meru" },
  { label: "Nyeri", value: "nyeri" },
  { label: "Embu", value: "embu" },
  { label: "Kisii", value: "kisii" },
  { label: "Kericho", value: "kericho" },
  { label: "Bomet", value: "bomet" },
  { label: "Lodwar", value: "lodwar" },
]);

const BrandList = ref([
  { label: "John Deere", value: "john-deere" },
  { label: "Massey Ferguson", value: "massey-ferguson" },
  { label: "New Holland", value: "new-holland" },
  { label: "Kubota", value: "kubota" },
  { label: "Case IH", value: "case-ih" },
  { label: "Claas", value: "claas" },
  { label: "Valtra", value: "valtra" },
  { label: "Fendt", value: "fendt" },
  { label: "Deutz-Fahr", value: "deutz-fahr" },
  { label: "Same", value: "same" },
  { label: "Zetor", value: "zetor" },
  { label: "McCormick", value: "mccormick" },
  { label: "JCB", value: "jcb" },
  { label: "Landini", value: "landini" },
  { label: "Yanmar", value: "yanmar" },
  { label: "AGCO", value: "agco" },
  { label: "Ford", value: "ford" },
  { label: "Deere & Company", value: "deere-company" },
  { label: "Caterpillar", value: "caterpillar" },
  { label: "Kioti", value: "kioti" },
  { label: "LS Tractor", value: "ls-tractor" },
  { label: "Mahindra", value: "mahindra" },
  { label: "TAFE", value: "tafe" },
  { label: "Sonalika", value: "sonalika" },
  { label: "Escorts", value: "escorts" },
  { label: "Swaraj", value: "swaraj" },
  { label: "VST Tillers", value: "vst-tillers" },
  { label: "Indo Farm", value: "indo-farm" },
  { label: "Preet", value: "preet" },
  { label: "Captain", value: "captain" }]);


// add your filters here
const fetchData = async () => {
  dataLoading.value = true;
  await getAllTractors({
    page: page.value,
    pageSize: pageSize.value,
    search: searchText.value,
  })
    .then((res) => {
      dataList.value = res;
      console.log(res, "data");
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


onMounted(() => {
  fetchData();
});

watch(
  [page, pageSize, searchText],
  () => {
    fetchData();
  },
  { deep: true }
);

definePageMeta({
  layout: "default",
});
</script>


<style>
.p-paginator-page.p-paginator-page-selected {
  background: #fdc7ba !important;
  color: #ff5029 !important;
}
</style>