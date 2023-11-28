import { useEffect, useState } from "react";
import { getMySoportes } from "../../api/soportes";

export const useMySoportes = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarMySoportes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMySoportes();

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
