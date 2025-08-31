<script setup>
const props = defineProps(["data"]);
const emit = defineEmits(["update"]);
const { $toast } = useNuxtApp();
// const { getAllProducts } = useProductsAPI();

const products = ref([]);
const dataLoaded = ref(false);
const selectedList = ref([]);



// const fetchProducts = async () => {
//   await getAllProducts({})
//     .then((response) => {
//       // add a new property selectedQty and init to 0
//       products.value =
//         response.data?.map((product) => ({ ...product, selectedQty: 0 })) || [];
//     })
//     .catch((error) => {
//       console.log(error.message);
//       setTimeout(() => {
//         fetchProducts();
//       }, 2000);
//     })
//     .finally(() => {
//       dataLoaded.value = true;
//     });
// };

const handleSubmit = () => {
  if (selectedList.value.length === 0) {
    $toast.error("Please select at least one product");
    return;
  } else {
    // make sure the products selected have a combined pv of at least 20
    const totalPv = selectedList.value.reduce(
      (acc, product) => acc + product.pv,
      0
    );

    if (totalPv < 20) {
      $toast.error("Please select products with a combined PV of at least 20");
      return;
    } else {
      emit("update", selectedList.value);
    }
  }
};

onMounted(() => {
  // fetchProducts();
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-between border-b pb-1">
      <button
        class="btn-dark text-xs md:text-base"
        type="button"
        @click="emit('back')"
      >
        <i class="fas fa-chevron-left"></i> Back
      </button>

      <button class="btn-primary text-xs md:text-base" type="submit">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div style="height: calc(100vh - 260px)">
      <div class="overflow-auto h-full pb-6">
        <div v-if="dataLoaded">
          <div
            class="grid grid-cols-2 gap-3 md:grid-cols-3 pt-3"
            v-if="products.length > 0"
          >
            <template v-for="(product, i) in products" :key="i">
              <label
                class="relative border border-gray-300 rounded-md p-2"
                :class="{
                  'bg-blue-100': selectedList.some(
                    (item) => item._id === product._id
                  ),
                  'opacity-65': product.quantity === 0,
                  'cursor-pointer': product.quantity > 0,
                }"
              >
                <!-- @change, update selectedQty to 1 -->
                <Checkbox
                  v-model="selectedList"
                  :value="product"
                  class="!absolute top-2 right-2 border border-gray-700 rounded-full overflow-hidden z-50"
                  @change="
                    (e) => {
                      if (e.target.checked) {
                        products[i].selectedQty = 1;
                      } else {
                        products[i].selectedQty = 0;
                      }
                    }
                  "
                />

                <div class="relative bg-white pt-[70%] mb-1">
                  <img
                    :src="product.images[1]"
                    class="absolute inset-0 w-full h-full object-cover"
                    alt=""
                    v-if="product.imageCover"
                  />
                  <!-- <img src="/assets/images/logo.webp" class="absolute inset-0 w-full h-full object-contain" alt=""
                    v-if="product.imageCover" /> -->
                  <span
                    class="absolute inset-0 flex items-center justify-center text-gray-400"
                    v-else
                  >
                    <i class="pi pi-image text-4xl" />
                  </span>
                </div>

                <div class="text-sm font-semibold truncate">
                  {{ product.title }}
                </div>

                <div class="text-xs">
                  <span class="font-semibold"> Price: </span>{{ " " }}
                  {{ product.price }}
                </div>

                <div class="text-xs">
                  <span class="font-semibold"> PV: </span>{{ " " }}
                  {{ product.pv }}
                </div>

                <div class="text-xs truncate-3">{{ product.description }}</div>

                <div
                  class="mt-2 rounded-md text-center text-lg font-semibold text-red-600"
                  v-if="product.quantity - product.sold === 0"
                >
                  Out of Stock
                </div>

                <InputGroup
                  class="mt-2"
                  v-else-if="
                    selectedList.find((item) => item._id === product._id)
                  "
                >
                  <InputGroupAddon class="!p-0">
                    <button
                      type="button"
                      class="w-full h-full"
                      @click="
                        (e) => {
                          e.stopPropagation();
                          selectedList.find(
                            (item) => item._id === product._id
                          ).selectedQty -= 1;
                        }
                      "
                      :disabled="
                        selectedList.find((item) => item._id === product._id)
                          .selectedQty === 0
                      "
                    >
                      <i class="pi pi-minus" />
                    </button>
                  </InputGroupAddon>
                  <InputText
                    min="0"
                    :max="product.quantity - product.sold"
                    type="number"
                    class="text-center !text-xs !py-1 !bg-white"
                    :value="
                      selectedList.find((item) => item._id === product._id)
                        ?.selectedQty || 0
                    "
                    @input="
                      (e) => {
                        selectedList.find(
                          (item) => item._id === product._id
                        ).selectedQty = Number(e.target.value);
                      }
                    "
                  />
                  <InputGroupAddon class="!p-0">
                    <button
                      type="button"
                      class="w-full h-full"
                      @click="
                        (e) => {
                          e.stopPropagation();
                          selectedList.find(
                            (item) => item._id === product._id
                          ).selectedQty += 1;
                        }
                      "
                      :disabled="
                        selectedList.find((item) => item._id === product._id)
                          .selectedQty ===
                        product.quantity - product.sold
                      "
                    >
                      <i class="pi pi-plus" />
                    </button>
                  </InputGroupAddon>
                </InputGroup>

                <div
                  v-else
                  class="mt-2 rounded-md text-center text-lg font-semibold text-green-600"
                >
                  In Stock: {{ product.quantity - product.sold }}
                </div>
              </label>
            </template>
          </div>

          <div v-else class="text-center col-span-2">
            <p class="text-2xl font-semibold mt-3">No products available</p>
          </div>
        </div>

        <div v-else class="text-center pt-5">
          <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
          />
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
  </form>
</template>
