import { defineStore } from 'pinia'
// import useFavouriteApi from '../api/useFavouriteApi'
import { useFavouriteAPI } from '../composables/useFavouriteAPI'

export const useFavouriteStore = defineStore('useFavouriteStore', () => {

  const { getFavourite,
    addToFavourite,
    deleteFavourite,
    clearFavourite } = useFavouriteAPI();

  /**
   * States
   */

  const {token} = useAuthStore();
  const isFavouriteLoaded = ref(false)
  // const cart = ref({})
  const favouriteItems = ref([])
  // {
  //   price: 100,
  //   productID: "123",
  //   pv: 100,
  //   quantity: 1,
  //   _id: "123",
  // }
  // const totalPrice = ref(0)
  // const totalPV = ref(0)
  /**
   * end of states
   */

  /**
   * Actions
   */
  const fetchFavourite = async () => {
    await getFavourite()
      .then((data) => {
        // cart.value = data.cart
        favouriteItems.value = data.cart.favouriteItems
        // totalPrice.value = data.cart.totalCartPrice
        // totalPV.value = data.cart.totalCartPV
      })
      .catch((error) => {
        console.error(error)
        // cart.value = {}
        favouriteItems.value = []
        // totalPrice.value = 0
        // totalPV.value = 0
      })
      .finally(() => {
        isCartLoaded.value = true
      })
  }

  const updateItem = async (productId) => {
    await addToFavourite(productId, token)
      .then(async(data) => {
        await fetchWishList(token);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const removeItem = async (productId) => {
    await deleteFavourite(productId,token)
      .then(async(data) => {
        await fetchWishList(token);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const clearAll = async () => {
    await clearFavourite()
      .then(async(data) => {
        await fetchWishList(token);
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        // cart.value = {}
        favouriteItems.value = []
        // totalPrice.value = 0
        // totalPV.value = 0
      })
  }

  return {
    // states
    isFavouriteLoaded,
    favouriteItems,
    fetchFavourite,
    updateItem,
    removeItem,
    clearAll,
  }
})