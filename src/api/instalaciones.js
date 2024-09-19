import { instance as http } from "./http";

export const getInstalations = async () => {
  try {
    const { data: response } = await http.get("/instalaciones");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createInstalation = async (payload) => {
  try {
    const { data: response } = await http.post("/instalaciones", payload);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const removeInstalation = async (id) => {
  try {
    const { data: response } = await http.delete(`/instalaciones/${id}`);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateInstalation = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/instalaciones/${id}`, payload);

    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
