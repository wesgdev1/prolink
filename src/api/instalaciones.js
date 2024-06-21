import { instance as http } from "./http";

export const getInstalations = async () => {
  try {
    const { data: response } = await http.get("/instalaciones");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
