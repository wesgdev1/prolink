import { useEffect, useState } from "react";
import { signIn } from "../api/auth";

export const useAuth = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const iniciarSesion = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await signIn();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    iniciarSesion();
  }, []);

  return { data, loading, error };
};
