import { instance as http } from "./http";

export const getExcustomers = async () => {
  try {
    const { data: response } = await http.get("/retiros");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createExcustomer = async (payload) => {
  try {
    const { data: response } = await http.post("/retiros", payload);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const removeExcustomer = async (id) => {
  try {
    const { data: response } = await http.delete(`/retiros/${id}`);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateExcustomer = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/retiros/${id}`, payload);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
