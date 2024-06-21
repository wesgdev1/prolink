import { useEffect, useState } from "react";
import { getInstalations } from "../api/instalaciones";

export const useInstalations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarInstalations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getInstalations();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInstalations();
  }, []);

  return { data, loading, error };
};
