import { useEffect, useState } from "react";
import { getBlog } from "../api/blogs";

export const useBlog = ({ id }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarBlogs = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getBlog(id);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBlogs(id);
  }, [id]);

  return { data, loading, error };
};
