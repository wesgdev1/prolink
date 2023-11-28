import { useEffect, useState } from "react";
import { getSoportesDia } from "../../api/soportes";

export const useSoportesDia = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarMySoportes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getSoportesDia();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMySoportes();
  }, []);

  return { data, loading, error };
};
