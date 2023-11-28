import { instance as http } from "./http";

export const getClientes = async () => {
  try {
    const { data: response } = await http.get("/clientes");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createCliente = async (cliente) => {
  try {
    const { data: response } = await http.post("/clientes", cliente);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateCliente = async (cliente, payload) => {
  try {
    const { data: response } = await http.put(`/clientes/${cliente}`, payload);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
