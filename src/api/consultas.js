import { instance as http } from "./http";

export const createConsulta = async (payload) => {
  try {
    const { data: response } = await http.post("/consultas", payload);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getConsultas = async () => {
  try {
    const { data: response } = await http.get("/consultas");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateConsulta = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/consultas/${id}`, payload);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
