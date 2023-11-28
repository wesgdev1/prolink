import { useEffect, useState } from "react";
import { getAllSoportes, getMySoportes } from "../../api/soportes";

export const useSoportes = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarSoportes = async () => {
    setLoading(true);
    setError("");

    try {
      if (user?.tipoUsuario === "Tecnico") {
        const response = await getMySoportes();
        setData(response.data);
      } else {
        const response = await getAllSoportes();
        setData(response.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSoportes();
  }, []);

  return { data, loading, error };
};
