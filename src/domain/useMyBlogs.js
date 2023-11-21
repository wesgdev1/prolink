import { useEffect, useState } from "react";
import { getMyBlogs } from "../api/blogs";

export const useMyBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarBlogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyBlogs();

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
