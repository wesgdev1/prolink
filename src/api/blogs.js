import { instance as http } from "./http";

export const getBlogs = async () => {
  try {
    const { data: response } = await http.get("/blogs");

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.messagee);
  }
};

export const createBlog = async (payload) => {
  try {
    const { data: response } = await http.post("/blogs", payload);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.messagee);
  }
};
