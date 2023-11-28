import { useEffect, useState } from "react";
import { getTecnicos } from "../../api/tecnicos";

export const useTecnicos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarTecnicos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getTecnicos();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTecnicos();
  }, []);

  return { data, loading, error };
};
