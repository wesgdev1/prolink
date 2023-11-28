import { useEffect, useState } from "react";
import { getClientes } from "../../api/Clientes";

export const useClientes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarClientes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getClientes();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  return { data, loading, error, cargarClientes };
};
