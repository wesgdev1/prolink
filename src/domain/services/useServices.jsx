import { useEffect, useState } from "react";
import { getServices } from "../../api/services";

export const useServices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarServices = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getServices();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarServices();
  }, []);

  return { data, loading, error, cargarServices };
};
