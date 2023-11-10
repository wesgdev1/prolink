import { instance as http } from "./http";

export const createPago = async (payload) => {
  try {
    // const { data: response } = await http.post("/pagos/create-order", payload);
    // return { data: response.data, meta: response.meta };

    const response = await http.post("/pagos/create-order", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.messagee);
  }
};
