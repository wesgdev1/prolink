import { instance as http } from "./http";

export const hacerPing = async ({ ip }) => {
  try {
    const { data: response } = await http.get(`/pings/${ip}`);

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
