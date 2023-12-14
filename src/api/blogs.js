import { instance as http } from "./http";

export const getBlogs = async () => {
  try {
    const { data: response } = await http.get("/blogs");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyBlogs = async () => {
  try {
    const { data: response } = await http.get("/blogs/myBlogs");

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createBlog = async (payload) => {
  try {
    const { data: response } = await http.post("/blogs", payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateBlog = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/blogs/${id}`, payload);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getBlog = async (id) => {
  try {
    const { data: response } = await http.get(`/blogs/${id}`);

    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createComentario = async (id, payload) => {
  try {
    const { data: response } = await http.post(
      `/comentarios?blogId=${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
