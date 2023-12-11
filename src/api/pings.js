import { instance as http } from "./http";

export const hacerPing = async ({ ip }) => {
  try {
    const { data: response } = await http.get(`/pings/${ip}`);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
