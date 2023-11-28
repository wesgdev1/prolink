import { useEffect, useState } from "react";
import { getSoporte } from "../../api/soportes";

export const useSoporte = ({ id }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarSoporte = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getSoporte(id);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSoporte(id);
  }, [id]);

  return { data, loading, error };
};
