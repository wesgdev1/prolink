import { useEffect, useState } from "react";
import { createBlog, getBlogs } from "../api/blogs";

export const useBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarBlogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getBlogs();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBlogs();
  }, []);

  return { data, loading, error };
};
