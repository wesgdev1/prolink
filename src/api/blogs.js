import { instance as http } from "./http";

export const getBlogs = async () => {
  try {
    const { data: response } = await http.get("/blogs");

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyBlogs = async () => {
  try {
    const { data: response } = await http.get("/blogs/myBlogs");

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createBlog = async (payload) => {
  try {
    const { data: response } = await http.post("/blogs", payload);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateBlog = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/blogs/${id}`, payload);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getBlog = async (id) => {
  try {
    const { data: response } = await http.get(`/blogs/${id}`);

    // TODO No voy a validad por el momento, pero debería
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};
