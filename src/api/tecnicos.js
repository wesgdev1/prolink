import { instance as http } from "./http";

export const getTecnicos = async () => {
  try {
    const { data: response } = await http.get("/tecnicos");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createTecnico = async (tecnico) => {
  try {
    const { data: response } = await http.post("/tecnicos", tecnico);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateTecnico = async (tecnico, payload) => {
  try {
    const { data: response } = await http.put(`/tecnicos/${tecnico}`, payload);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
