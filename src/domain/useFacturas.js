import { useEffect, useState } from "react";
import { getFacturas } from "../api/facturas";

export const useFacturas = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarFacturas = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getFacturas();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const recargarFacturas = async () => {
    cargarFacturas();
  };

  useEffect(() => {
    cargarFacturas();
  }, []);

  return { data, loading, error, recargarFacturas };
};
