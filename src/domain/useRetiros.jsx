import { useEffect, useState } from "react";

import { getExcustomers } from "../api/retiros";

export const useRetiros = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarRetiros = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getExcustomers();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRetiros();
  }, []);

  return { data, loading, error, cargarRetiros };
};
