import { instance as http } from "../http";
export const createSoporte = async (payload) => {
  try {
    const { data: response } = await http.post("/soportes", payload);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getAllSoportes = async () => {
  try {
    const { data: response } = await http.get("/soportes");

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getSoporte = async (id) => {
  try {
    const { data: response } = await http.get(`/soportes/${id}`);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMySoportes = async () => {
  try {
    const { data: response } = await http.get("/soportes/mySoportes");

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getSoportesDia = async () => {
  try {
    const { data: response } = await http.get("/soportes/soportesDia");

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateSoporte = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/soportes/${id}`, payload);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
