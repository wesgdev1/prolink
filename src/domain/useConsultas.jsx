import { useEffect, useState } from "react";
import { getConsultas } from "../api/consultas";

export const useConsultas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarConsultas = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getConsultas();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarConsultas();
  }, []);

  return { data, loading, error, cargarConsultas };
};
