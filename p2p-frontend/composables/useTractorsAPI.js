import { useCustomFetch } from "./useCustomFetch";

export const useTractorsAPI = () => {

  const getAllTractors = async ({ search = '', pageSize = 100 }) => {

    let url = '/tractor?limit=' + pageSize;

    if (search) {
      url += `&keyword=${search}`;
    }


    return await useCustomFetch(url, {
      method: "GET",
    });
  };

  const getTractorById = async (id) => {
    return await useCustomFetch(`/tractor/${id}`, {
      method: "GET",
    });
  };

  const createTractor = async (data) => {
    return await useCustomFetch('/tractor', {
      method: "POST",
      body: data,
    });
  };

  const updateTractor = async (id, data) => {
    return await useCustomFetch(`/tractor/${id}`, {
      method: "PATCH",
      body: data,
    });
  };

  const getTractor = async (id, data) => {
    return await useCustomFetch(`/tractor/${id}`, {
      method: "GET",
    });
  };

  const getTractors = async (id, data) => {
    return await useCustomFetch(`/tractor`, {
      method: "GET",
    });
  };

  const incrementViewCount = async (id) => {
    return await useCustomFetch(`/tractor/increment/${id}`, {
      method: "POST",
    });
  };

  const getViewCount = async (id) => {
    return await useCustomFetch(`/tractor/view/${id}`, {
      method: "GET",
    });
  };

  const deleteTractor = async (id) => {
    return await useCustomFetch(`/products/${id}`, {
      method: "DELETE",
    });
  };

  return {
    getAllTractors,
    getTractorById,
    createTractor,
    updateTractor,
    deleteTractor,
  };
};
