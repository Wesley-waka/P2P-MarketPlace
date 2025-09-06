<template>

  <Navbar/>

  <div class="card w-[80rem] mx-auto py-2">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Overview

          <i class="pi pi-chart-line" />
        </Tab>
        <Tab value="1" class="flex flex-row space-x-2">
          Sellers
          <img :src="extractPhotos('/Black/Hello Tractor_RGB_BLACK_-Income.png')" class="w-[40px]" alt="">
          <!-- <i class="pi pi-list" /> -->
          
        </Tab>
        <Tab value="2" class="flex flex-row space-x-2">Buyers
          <!-- <i class="pi pi-list" /> -->
          <img :src="extractPhotos('/Black/Hello Tractor_RGB_BLACK_-Cart-03.png')" class="w-[40px]" alt="">

          
        </Tab>
        <Tab value="3" class="flex flex-row space-x-2">Products
          <!-- <i class="pi pi-list" /> -->
          <img :src="extractPhotos('/Black/Hello Tractor_RGB_BLACK_-Production Cycle.png')" class="w-[40px]" alt="">
          
        </Tab>
    </TabList>
        <TabPanels>
            <TabPanel value="0">
               <div class="flex flex-row  w-full justify-between">
                 <AdminDashBoardProducts/>
                 <AdminDashBoardUserGrowth/>
                </div>
                <AdminDashBoardSales/>
            </TabPanel>
            <TabPanel value="1">
                <div class="card">
                    <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave"
                        :pt="{
                            table: { style: 'min-width: 50rem' },
                            column: {
                                bodycell: ({ state }) => ({
                                    style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                                })
                            }
                        }"
                    >
                        <Column field="code" header="Code" style="width: 20%">
                            <template #editor="{ data, field }">
                                <InputText v-model="data[field]" fluid />
                            </template>
                        </Column>
                        <Column field="name" header="Name" style="width: 20%">
                            <template #editor="{ data, field }">
                                <InputText v-model="data[field]" fluid />
                            </template>
                        </Column>
                        <Column field="inventoryStatus" header="Status" style="width: 20%">
                            <template #editor="{ data, field }">
                                <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                                    <template #option="slotProps">
                                        <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                                    </template>
                                </Select>
                            </template>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                            </template>
                        </Column>
                        <Column field="price" header="Price" style="width: 20%">
                            <template #body="{ data, field }">
                                {{ formatCurrency(data[field]) }}
                            </template>
                            <template #editor="{ data, field }">
                                <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" fluid />
                            </template>
                        </Column>
                        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
                    </DataTable>
                </div>
            </TabPanel>
            <TabPanel value="2">
                <!-- <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p> -->
                <div class="card">
                  <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave"
                      :pt="{
                          table: { style: 'min-width: 50rem' },
                          column: {
                              bodycell: ({ state }) => ({
                                  style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                              })
                          }
                      }"
                  >
                      <Column field="code" header="Code" style="width: 20%">
                          <template #editor="{ data, field }">
                              <InputText v-model="data[field]" fluid />
                          </template>
                      </Column>
                      <Column field="name" header="Name" style="width: 20%">
                          <template #editor="{ data, field }">
                              <InputText v-model="data[field]" fluid />
                          </template>
                      </Column>
                      <Column field="inventoryStatus" header="Status" style="width: 20%">
                          <template #editor="{ data, field }">
                              <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                                  <template #option="slotProps">
                                      <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                                  </template>
                              </Select>
                          </template>
                          <template #body="slotProps">
                              <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                          </template>
                      </Column>
                      <Column field="price" header="Price" style="width: 20%">
                          <template #body="{ data, field }">
                              {{ formatCurrency(data[field]) }}
                          </template>
                          <template #editor="{ data, field }">
                              <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" fluid />
                          </template>
                      </Column>
                      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
                  </DataTable>
              </div>

            </TabPanel>

            <TabPanel value="3">
                <!-- <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p> -->
                <div class="card">
                  <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave"
                      :pt="{
                          table: { style: 'min-width: 50rem' },
                          column: {
                              bodycell: ({ state }) => ({
                                  style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                              })
                          }
                      }"
                  >
                      <Column field="code" header="Code" style="width: 20%">
                          <template #editor="{ data, field }">
                              <InputText v-model="data[field]" fluid />
                          </template>
                      </Column>
                      <Column field="name" header="Name" style="width: 20%">
                          <template #editor="{ data, field }">
                              <InputText v-model="data[field]" fluid />
                          </template>
                      </Column>
                      <Column field="inventoryStatus" header="Status" style="width: 20%">
                          <template #editor="{ data, field }">
                              <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                                  <template #option="slotProps">
                                      <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                                  </template>
                              </Select>
                          </template>
                          <template #body="slotProps">
                              <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                          </template>
                      </Column>
                      <Column field="price" header="Price" style="width: 20%">
                          <template #body="{ data, field }">
                              {{ formatCurrency(data[field]) }}
                          </template>
                          <template #editor="{ data, field }">
                              <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" fluid />
                          </template>
                      </Column>
                      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
                  </DataTable>
            </div>
            </TabPanel>
        </TabPanels>
    </Tabs>
  </div>

  <Footer/>

        <!-- <Paginator
            :alwaysShow="false"
            :rows="pageSize"
            :totalRecords="totalSize"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} of {totalRecords}"
            @page="(e) => (page = e.page + 1)"
            class="!rounded-b-xl border-t mt-3"
        >
        </Paginator> -->

</template>

<script setup>
// import { useAuthAPI } from '~/composables/useAuthAPI';
// import { useTractorsAPI } from '~/composables/useTractorsAPI';
// const page = ref(1);
// const pageSize = ref(10);
// const searchText = ref('');
// const user = ref('');
// const { getAllUsers} = useAuthAPI();
// const { getAllTractors} = useTractorsAPI();
// const systemHealth = ref(null);
// const userGrowth = ref(false);


// const dataList = ref([]);
// const currentUserCount = ref(0);
// const previousUserCount = ref(0);
// const userGrowthRate = ref(0);

// const fetchTractorsData = async () => {
//   dataLoading.value = true;
//   await getAllTractors({
//     page: page.value,
//     pageSize: pageSize.value,
//     search: searchText.value,
//   })
//     .then((res) => {
//       dataList.value = res.data;
//       totalSize.value = res.result || 0;
//     })
//     .catch((error) => {
//       console.error(error);
//     })
//     .finally(() => {
//       dataLoading.value = false;
//       dataLoaded.value = true;
//     });
// };

// const fetchUsersData = async () => {
//   dataLoading.value = true;
//   await getAllUsers({
//     page: page.value,
//     pageSize: pageSize.value,
//     search: searchText.value,
//     user: user.value,
//   })
//     .then((res) => {
//       dataList.value = res.data;
//       totalSize.value = res.result || 0;
//     })
//     .catch((error) => {
//       console.error(error);
//     })
//     .finally(() => {
//       dataLoading.value = false;
//       dataLoaded.value = true;
//     });
// };

// const fetchUserData = async (period) => {
//   try {
//     const response = await getAllUsers({ period });
//     return response.data.length;
//   } catch (error) {
//     console.error(error);
//     return 0;
//   }
// };


// const calculateUserGrowth = async () => {
//   const currentPeriod = 'march-2024'; // Adjust the period as needed
//   const previousPeriod = 'december-2024'; // Adjust the period as needed

//   currentUserCount.value = await fetchUserData(currentPeriod);
//   previousUserCount.value = await fetchUserData(previousPeriod);

//   if (previousUserCount.value > 0) {
//     userGrowthRate.value = ((currentUserCount.value - previousUserCount.value) / previousUserCount.value) * 100;
//   } else {
//     userGrowthRate.value = 0;
//   }
// };


// const { approvedCount, notApprovedCount } = dataList.value.reduce(
//   (acc, product) => {
//     if (product.isApproved) {
//       acc.approvedCount += 1;
//     } else {
//       acc.notApprovedCount += 1;
//     }
//     return acc;
//   },
//   { approvedCount: 0, notApprovedCount: 0 }
// );


// const items = ref([
//     { route: '/dashboard', label: 'Dashboard', icon: 'pi pi-home' },
//     { route: '/transactions', label: 'Transactions', icon: 'pi pi-chart-line' },
//     { route: '/products', label: 'Products', icon: 'pi pi-list' },
//     { route: '/messages', label: 'Messages', icon: 'pi pi-inbox' }
// ]);



// watch(
//   [page, pageSize, searchText,user],
//   () => {
//     fetchData();
//   },
//   { deep: true }
// );


// onMounted(() => {
//     fetchUsersData();
//     fetchTractorsData();
// });

import { ref, onMounted, watch } from 'vue';
import { ProductService } from '../../utils/ProductService';

const products = ref([]);
const editingRows = ref([]);
const statuses = ref([
  { label: 'In Stock', value: 'INSTOCK' },
  { label: 'Low Stock', value: 'LOWSTOCK' },
  { label: 'Out of Stock', value: 'OUTOFSTOCK' },
]);

// Fetch initial products
onMounted(() => {
  ProductService.getProductsMini().then((data) => (products.value = data));
});

// Function to handle the API update call when a product's status changes
const updateProductStatus = async (product) => {
  try {
    await ProductService.updateProduct(product.id, { inventoryStatus: product.inventoryStatus });
    console.log(`Product ${product.id} status updated to ${product.inventoryStatus}`);
  } catch (error) {
    console.error('Failed to update product status:', error);
  }
};

// Watch for changes in the inventoryStatus of each product
watch(
  products,
  (newProducts, oldProducts) => {
    newProducts.forEach((newProduct, index) => {
      const oldProduct = oldProducts[index];
      if (newProduct.inventoryStatus !== oldProduct?.inventoryStatus) {
        updateProductStatus(newProduct);
      }
    });
  },
  { deep: true } // Deep watch to monitor nested changes
);

// Handle row edit save and trigger status update if modified
const onRowEditSave = (event) => {
  const { newData, index } = event;
  products.value[index] = newData;
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

</script>