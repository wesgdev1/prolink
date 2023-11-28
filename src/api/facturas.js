import { instance as http } from "./http";

export const getFactura = async ({ id }) => {
  try {
    const { data: response } = await http.get(`/facturas/${id}`);
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getFacturaSearch = async ({ id }) => {
  try {
    const { data: response } = await http.get(`/facturas/search/${id}`);
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getFacturas = async () => {
  try {
    const { data: response } = await http.get("/facturas?limit=100");
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createFactura = async (payload) => {
  try {
    const { data: response } = await http.post("/facturas", payload);
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
