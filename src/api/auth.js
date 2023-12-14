import { instance as http } from "./http";

export const signIn = async (payload) => {
  try {
    const { data: response } = await http.post("/users/signin", payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.messagee);
  }
};

export const signUp = async (payload) => {
  try {
    const { data: response } = await http.post("/users/signup", payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const changePassword = async (payload) => {
  try {
    const { data: response } = await http.put(
      "/users/auth/change-password",
      payload
    );

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateProfile = async (id, payload) => {
  try {
    const { data: response } = await http.patch(`/users/${id}`, payload);

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
