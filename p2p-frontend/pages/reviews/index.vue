<template>

</template>

<script setup>
import { useReviewsAPI } from '~/composables/useReviewsAPI';

const {getAllReviews,getRatingReview,createFeedBackReview,getReviewById,createRating} = useReviewsAPI();

const fetchReviews = async (id) => {
  dataLoading.value = true;
  await getAllReviews(id)
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

const fetchReviewById = async (id) => {
  dataLoading.value = true;
  await getReviewById(id)
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

const fetchRating = async (id) => {
  dataLoading.value = true;
  await getRatingReview(id)
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

const createReviews = async(data) => {
    dataLoading.value = true;
  await getAllReviews(data)
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
}

const createRatings = async(data) => {
    dataLoading.value = true;
  await createRating(data)
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
}

const createFeedBack = async(data) => {
    dataLoading.value = true;
  await createFeedBackReview(data)
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
}

onMounted(() => {
    fetchReviews();
});

</script>