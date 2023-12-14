import { useEffect, useState } from "react";
import { getBlogs, getMyBlogs } from "../api/blogs";

export const useMyBlogs = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarBlogs = async () => {
    setLoading(true);
    setError("");

    try {
      if (user?.tipoUsuario === "Admin") {
        const response = await getBlogs();
        setData(response.data);
      } else {
        const response = await getMyBlogs();
        setData(response.data);
      }
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
