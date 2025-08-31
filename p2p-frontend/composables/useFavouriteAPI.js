// import { useAuthStore } from '@/stores/authStore';

// import auth from "~/middleware/auth";

export const useFavouriteAPI = (token) => {

  const urlSearchParams = new URLSearchParams({
    token: token
  });

  const getFavourite = async () => {
    return await useCustomFetch(`/auth/favoriteProducts?${urlSearchParams}`, {
      method: "GET",
    });
  };

  const addToFavourite = async (productId) => {
    const data = {
      productID: productId,
    };

    const urlSearchParams = new URLSearchParams({
      token: token,
    });

    return await useCustomFetch(`/auth/users/favoriteProducts?${urlSearchParams}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const deleteFavourite = async (productId) => {
    return await useCustomFetch(`/auth/users/${user_id}/favoriteProducts/${productId}`, {
      method: "DELETE",
    });
  };

  const clearFavourite = async () => {
    const urlSearchParams = new URLSearchParams({
      token: token,
    });

    return await useCustomFetch(`/auth/users/favoriteProducts/clear?${urlSearchParams}`, {
      method: "DELETE",
    });
  };

  return {
    getFavourite,
    addToFavourite,
    deleteFavourite,
    clearFavourite
  };
};