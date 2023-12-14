import { useEffect, useState } from "react";
import { getFactura } from "../api/facturas";

export const useFactura = ({ id }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarFactura = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getFactura({ id });

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarFactura(id);
  }, [id]);

  return { data, loading, error };
};
