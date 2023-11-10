import { instance as http } from "./http";

export const signIn = async (payload) => {
  try {
    const { data: response } = await http.post("/users/signin", payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.messagee);
  }
};
