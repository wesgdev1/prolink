import { useEffect, useState } from "react";

import { getAllBarrios } from "../api/Clientes";

export const useBarrios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarBarrios = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllBarrios();
      console.log(response.data);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBarrios();
  }, []);

  return { data, loading, error, cargarBarrios };
};
