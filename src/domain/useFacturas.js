import { useEffect, useState } from "react";
import { getFacturas, getMisFacturas } from "../api/facturas";

export const useFacturas = ({ user }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarFacturas = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("hice la peti");
      if (user?.tipoUsuario === "Admin") {
        const response = await getFacturas();
        setData(response.data);
        console.log("hice la peti");
      } else {
        const response = await getMisFacturas();
        setData(response.data);
      }
      // const response = await getFacturas();

      // setData(response.data);
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
