import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

import { useSoportes } from "../../domain/soportes/useSoportes";
import { SoportesTable } from "./SoportesTable";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const Soportes = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useSoportes({ user });

  return (
    <div className="pt-5">
      {loading && <Spinner animation="border" variant="info" />}
      {error && (
        <Alert variant="danger">Ocurrio un problema en el servidor</Alert>
      )}

      {data.length > 0 ? (
        <SoportesTable soportes={data} />
      ) : (
        <p>No tienes soportes</p>
      )}
    </div>
  );
};
