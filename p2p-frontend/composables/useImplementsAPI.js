import { useCustomFetch } from "./useCustomFetch";

export const useImplementsAPI = () => {

  const getAllImplements = async ({ search = '', pageSize = 100 }) => {

    let url = '/implement/implements?limit=' + pageSize;

    if (search) {
      url += `&keyword=${search}`;
    }


    return await useCustomFetch(url, {
      method: "GET",
    });
  };

  const getImplementById = async (id) => {
    return await useCustomFetch(`/implement/${id}`, {
      method: "GET",
    });
  };

  const createImplement = async (data) => {
    return await useCustomFetch('/implement/', {
      method: "POST",
      body: data,
    });
  };

  const updateImplement = async (id, data) => {
    return await useCustomFetch(`/implement/${id}`, {
      method: "PATCH",
      body: data,
    });
  };

  const createImplementView = async (id) => {
    return await useCustomFetch(`/implement/increment/${id}`, {
      method: "POST",
    });
  };

  const getImplement = async (id, data) => {
    return await useCustomFetch(`/implements/count/${id}`, {
      method: "GET",
    });
  };


  return {
    getAllImplements,
    getImplementById,
    createImplement,
    getImplement,
    createImplementView,
    updateImplement,

  };
};
