import { useCustomFetch } from "./useCustomFetch";

export const useReviewsAPI = () => {

  const getReviewsSeller = async (id) => {
    return await useCustomFetch(`/review/sellers/${id}/reviews`, {
      method: "GET",
    });
  };

  const getReviewById = async (id) => {
    return await useCustomFetch(`/review/${id}`, {
      method: "GET",
    });
  };

  const createReview = async (data) => {
    return await useCustomFetch('/review/reviews', {
      method: "POST",
      body: data,
    });
  };

  const createRating = async (data) => {
    return await useCustomFetch('/review/ratings', {
      method: "POST",
      body: data,
    });
  };


  const createFeedBackReview = async (id, data) => {
    return await useCustomFetch(`/review/reviews/${id}/feeeedback`, {
      method: "POST",
      body: data,
    });
  };

  const getRatingReview = async (id) => {
    return await useCustomFetch(`/review/sellers/${id}/rating`, {
      method: "GET",
      body: data,
    });
  };

  // const updateReview = async (id, data) => {
  //   return await useCustomFetch(`/review/${id}`, {
  //     method: "PATCH",
  //     body: data,
  //   });
  // };

  // const deleteReview = async (id) => {
  //   return await useCustomFetch(`/review/${id}`, {
  //     method: "DELETE",
  //   });
  // };

  return {
    getReviewsSeller,
    getReviewById,
    createReview,
    createFeedBackReview,
    getRatingReview,
    createRating
  };
};
