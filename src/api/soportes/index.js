import { instance as http } from "../http";
export const createSoporte = async (payload) => {
  try {
    const { data: response } = await http.post("/soportes", payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getAllSoportes = async () => {
  try {
    const { data: response } = await http.get("/soportes");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getSoporte = async (id) => {
  try {
    const { data: response } = await http.get(`/soportes/${id}`);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMySoportes = async () => {
  try {
    const { data: response } = await http.get("/soportes/mySoportes");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getSoportesDia = async () => {
  try {
    const { data: response } = await http.get("/soportes/soportesDia");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateSoporte = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/soportes/${id}`, payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
