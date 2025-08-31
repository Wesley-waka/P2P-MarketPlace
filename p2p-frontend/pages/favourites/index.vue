<template>
    <Navbar />

    <div class="h-[1200px] bg-slate-50 max-w-[84rem] mx-auto py-5">
        <!-- <h2>
            Total Favourite products
        </h2> -->
        <!-- <p>{{ products.length }}</p> -->

        <div v-if="products.length" class=" mb-8  flex flex-col space-y-2 h-[1200px]  overflow-y-auto">
            <div v-for="tractor in products" class="flex flex-col space-y-4" :key="tractor._id">
                <TractorCard :product="tractor" :all-products="false" />
            </div>
        </div>
    </div>

    <Footer />
</template>

<script setup>
// import { useFavouriteStore } from '~/stores/useFavouriteStore';
// import { useFavouriteApi } from '~/api/useFavouriteApi';

// const auth = useAuth();
// const emits = defineEmits(["close"]);
const favouriteStore = useFavouriteStore();
const { getAllTractors } = useTractorsAPI();
const { clearFavourite } = useFavouriteAPI();
const dataLoading = ref(false);

const {
    isFavouriteLoaded,
    favouriteItems,
    fetchFavourite,
    updateItem,
    removeItem,
    clearAll,
} = useFavouriteStore();

// const authStore = useAuthStore()
// const idUser = authStore.currentUser ? authStore.currentUser._id : null;
// console.log(idUser)


const products = ref([]);

// const cartItems = computed(() => favouriteStore.favouriteItems);


// const getFavourite = async () => {
//     await fetchFavourite()
//         .then((response) => {
//             products.value = response.data;
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// };


const fetchData = async () => {
    dataLoading.value = true;
    await getAllTractors({
        // page: page.value,
        // pageSize: pageSize.value,
        // search: searchText.value,
    })
        .then((res) => {
            products.value = res;
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

const clearFavorites = async () => {
  try {
    const response = await clearFavourite();

    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }

    const result = await response.json();
    console.log('Product removed from favorites:', result);
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};



onMounted(() => {
    fetchData();
});

</script>